import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("http://192.168.29.133:5000/login", data);

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        // Store tokens if available
        if (response.data.access_token) {
          localStorage.setItem("access_token", response.data.access_token);
        }
        if (response.data.refresh_token) {
          localStorage.setItem("refresh_token", response.data.refresh_token);
        }

        alert("Login successful");
        navigate("/"); // redirect to home
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f7f8fa",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Navbar */}
      <Box
      onClick={() => navigate("/")}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 3,
          pl: 5,
        }}
      >
        <Box
          component="svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          fill="none"
          sx={{ width: 30, height: 30, color: "#2563eb" }}
        >
          <path
            d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
            fill="currentColor"
          />
        </Box>
        <Typography
          sx={{
            fontSize: "1.4rem",
            fontWeight: 600,
            color: "#111",
          
          }}
        >
          Techbay
        </Typography>
      </Box>

      {/* Main Section */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pb: 8,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 5,
            width: 380,
            borderRadius: 4,
            textAlign: "center",
          }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: 1000,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Login
          </Typography>

          <TextField
            label="Email Address or Username"
            placeholder="you@example.com"
            type="text"
            fullWidth
            variant="outlined"
            margin="normal"
            {...register("email", { required: true })}
          />

          <TextField
            label="Password"
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            fullWidth
            variant="outlined"
            margin="normal"
            {...register("password", { required: true })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ textAlign: "right", mt: 1 }}>
            <Link href="#" underline="hover" sx={{ fontSize: 14 }}>
              Forgot Password?
            </Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.2,
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Divider sx={{ my: 3 }}>or</Divider>

          <Button
            variant="outlined"
            fullWidth
            sx={{
              gap: 1,
              py: 1.2,
              textTransform: "none",
              fontWeight: 500,
              borderRadius: 2,
              fontFamily: "Inter, sans-serif",
              color: "#3c4043",
              borderColor: "#dadce0",
              "&:hover": {
                backgroundColor: "#ffffffff",
                borderColor: "#5c3535ff",
              },
            }}
          >
            Continue with Google
            <Box
              component="img"
              src="https://techbay-um14.netlify.app/static/media/google_logo.e3727d762395819c0958.png"
              alt="Google logo"
              sx={{ width: 20, height: 20, mr: 1 }}
            />
          </Button>

          <Typography sx={{ mt: 3, fontSize: 14 }}>
            Don’t have an account?{" "}
            <Link
              underline="hover"
              onClick={() => navigate("/signup")}
              sx={{ cursor: "pointer" }}
            >
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
