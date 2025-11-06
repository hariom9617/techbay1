// AddressForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddressForm = () => {
  const navigate = useNavigate();
  const API = "http://192.168.29.133:5003";

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    alternatemobile: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    type: "Home",
  });

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/viewaddress`, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("API Response:", res.data);
      setSavedAddresses(res.data.addresses || res.data || []);
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleAddressSelect = (addr) => {
    setSelectedAddress(addr);
    setIsEditing(true);
    setFormData({
      fullName: addr.name || "",
      mobile: addr.mobile || "",
      alternatemobile: addr.alternatemobile || "",
      address: addr.address || "",
      city: addr.city || "",
      state: addr.state || "",
      postalCode: addr.pincode || "",
      type: addr.type || "Home",
    });
  };

  const handleAdd = async () => {
    if (!formData.fullName || !formData.address || !formData.mobile || !formData.city || !formData.state || !formData.postalCode) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: formData.fullName,
        mobile: formData.mobile,
        alternatemobile: formData.alternatemobile,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.postalCode,   // <-- YEH MATCH HONA CHAHIYE
        type: formData.type,
      };

      await axios.post(`${API}/addaddress`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Address added successfully!");
      resetForm();
      fetchAddresses();
    } catch (err) {
      console.error("Add error:", err.response?.data);
      toast.error(err.response?.data?.message || "Failed to add address");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedAddress) return;

    setLoading(true);
    try {
      const payload = {
        name: formData.fullName,
        mobile: formData.mobile,
        alternatemobile: formData.alternatemobile,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.postalCode,
        type: formData.type,
      };

      await axios.put(`${API}/updateaddress/${selectedAddress._id}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Address updated!");
      resetForm();
      fetchAddresses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedAddress || !window.confirm("Delete this address permanently?")) return;

    setLoading(true);
    try {
      await axios.delete(`${API}/deleteaddress/${selectedAddress._id}`);
      toast.success("Address deleted");
      resetForm();
      fetchAddresses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      mobile: "",
      alternatemobile: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      type: "Home",
    });
    setSelectedAddress(null);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-center" />

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-center items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Techbay</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-4">
        <p className="text-sm text-blue-600 font-medium">Shipping / Payment / Review</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Shipping Address</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-lg font-semibold mb-6">Select a saved address</h3>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : savedAddresses.length === 0 ? (
              <p className="text-gray-500 italic">No saved addresses</p>
            ) : (
              <div className="space-y-4">
                {savedAddresses.map((addr) => (
                  <div
                    key={addr._id}
                    onClick={() => handleAddressSelect(addr)}
                    className={`p-5 rounded-lg border-2 cursor-pointer transition-all shadow-sm ${
                      selectedAddress?._id === addr._id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="radio"
                        checked={selectedAddress?._id === addr._id}
                        onChange={() => {}}
                        className="mt-1 w-5 h-5 text-blue-600"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{addr.name}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {addr.address}, {addr.city}, {addr.state} {addr.pincode}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Or add a new shipping address</h3>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input id="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                  <input id="mobile" placeholder="10-digit mobile number" value={formData.mobile} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                  <input id="address" placeholder="Street address, P.O. box" value={formData.address} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 (Optional)</label>
                  <input id="alternatemobile" placeholder="Apartment, suite, unit, building" value={formData.alternatemobile} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input id="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                    <input id="postalCode" value={formData.postalCode} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none">
                      <option>India</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State / Province</label>
                    <input id="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                  <span className="text-sm text-gray-700">Save this address for future orders</span>
                </label>
              </div>

              <div className="mt-8">
                {!isEditing ? (
                  <button onClick={handleAdd} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md disabled:opacity-60">
                    {loading ? "Adding..." : "Use this address"}
                  </button>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    <button onClick={handleUpdate} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md">Update</button>
                    <button onClick={handleDelete} disabled={loading} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md">Delete</button>
                    <button onClick={resetForm} className="border-2 border-gray-400 text-gray-700 font-semibold py-3 rounded-md hover:bg-gray-50">Cancel</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-end">
          <button onClick={() => navigate("/checkout/payment")} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-md shadow-md">
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressForm; // <-- YEH BHI ZAROORI THA!