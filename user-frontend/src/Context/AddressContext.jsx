// src/context/AddressContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { State, City } from "country-state-city";

const API = axios.create({ baseURL: "http://192.168.29.133:5003" });
API.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("access_token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

/* ---------- Normalise any backend shape ---------- */
const normalizeAddresses = (raw) => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (raw.data && Array.isArray(raw.data)) return raw.data;
  if (raw.addresses && Array.isArray(raw.addresses)) return raw.addresses;
  if (raw.address) return Array.isArray(raw.address) ? raw.address : [raw.address];
  return [];
};


const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  /* ---- UI state ---- */
  const [form, setForm] = useState({
    name: "", mobile: "", address: "", city: "", state: "", pincode: "", type: "Home"
  });
  const [saved, setSaved] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---- Derived ---- */
  const indianStates = State.getStatesOfCountry("IN");
  const cities = form.state
    ? City.getCitiesOfState(
        "IN",
        indianStates.find(s => s.name === form.state)?.isoCode || ""
      )
    : [];

  /* ---- API ---- */
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/viewaddress");
      const list = normalizeAddresses(data?.data ?? data);
      setSaved(list);
    } catch (e) {
      toast.error("Failed to load addresses");
      setSaved([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const add = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await API.post("/addaddress", form);
      toast.success("Address added!");
      await fetchAll();
      reset();
    } catch (e) {
      toast.error(e.response?.data?.error ?? "Add failed");
    } finally {
      setLoading(false);
    }
  };

  const update = async () => {
    if (!selected?._id || !validate()) return;
    setLoading(true);
    try {
      await API.put("/updateaddress", { _id: selected._id, ...form });
      toast.success("Updated!");
      await fetchAll();
      reset();
    } catch (e) {
      toast.error(e.response?.data?.error ?? "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    if (!selected?._id) return toast.error("Select an address first");
    if (!window.confirm(`Delete ${selected.name}'s address?`)) return;
    setLoading(true);
    try {
      await API.delete("/deleteaddress", { data: { _id: selected._id } });
      toast.success("Deleted!");
      await fetchAll();
      reset();
    } catch (e) {
      toast.error(e.response?.data?.error ?? "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---- Helpers ---- */
  const reset = () => {
    setForm({ name: "", mobile: "", address: "", city: "", state: "", pincode: "", type: "Home" });
    setSelected(null);
    setEditing(false);
  };

  const select = (addr) => {
    setSelected(addr);
    setEditing(true);
    setForm({
      name: addr.name ?? "",
      mobile: addr.mobile ?? "",
      address: addr.address ?? "",
      city: addr.city ?? "",
      state: addr.state ?? "",
      pincode: addr.pincode ?? "",
      type: addr.type ?? "Home",
    });
  };

  const validate = () => {
    const { name, mobile, address, city, state, pincode, type } = form;
    if (!name || !mobile || !address || !city || !state || !pincode || !type) {
      toast.error("All fields required");
      return false;
    }
    if (!/^\d{10}$/.test(mobile)) { toast.error("Mobile: 10 digits"); return false; }
    if (!/^\d{6}$/.test(pincode)) { toast.error("Pincode: 6 digits"); return false; }
    return true;
  };

  const setField = (field, value) => setForm(p => ({ ...p, [field]: value }));
  const setType = t => setForm(p => ({ ...p, type: t }));
  const setStateName = (stateName) => {
    const st = indianStates.find(s => s.name === stateName);
    setForm(p => ({ ...p, state: st?.name ?? "", city: "" }));
  };

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const value = {
    form, setField, setType, setStateName,
    saved, loading,
    selected, select,
    editing,
    indianStates, cities,
    add, update, remove, reset,
  };

  return <AddressContext.Provider value={value}>{children}</AddressContext.Provider>;
};

export const useAddress = () => {
  const ctx = useContext(AddressContext);
  if (!ctx) throw new Error("useAddress must be used within AddressProvider");
  return ctx;
};