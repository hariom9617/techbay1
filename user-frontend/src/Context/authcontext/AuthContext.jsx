// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token") || "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile when token changes
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://192.168.29.133:5003/api/user/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Adjust if API returns { user: {...} } or just { ... }
        setUser(response.data.user || response.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setUser(null);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setToken("");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem("access_token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setToken("");
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
