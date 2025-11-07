// src/components/AddressForm.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import { useAddress } from "../Context/AddressContext";

const AddressForm = () => {
  const navigate = useNavigate();
  const {
    form, setField, setType, setStateName,
    saved, loading, select, selected, editing,
    indianStates, cities,
    add, update, remove, reset
  } = useAddress();

  const goToPayment = () => {
    if (!selected) return;
    navigate("/checkout/payment", { state: { selectedAddress: selected } });
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-center" />
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-3">
        <p className="text-sm text-blue-600 font-medium">Shipping / Payment / Review</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Shipping Address</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ---------- Saved Addresses ---------- */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Select a saved address</h3>

            {loading ? (
              <p className="text-gray-500">Loading addresses...</p>
            ) : saved.length === 0 ? (
              <p className="text-gray-500 italic">No saved addresses yet</p>
            ) : (
              <div className="space-y-3">
                {saved
                  .filter(a => a && (a.name || a.mobile || a.address || a.city))
                  .map(addr => (
                    <div
                      key={addr._id}
                      onClick={() => select(addr)}
                      className={`
                        flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all
                        ${selected?._id === addr._id ? "border-blue-600 bg-blue-50" : "border-gray-300 bg-white"}
                      `}
                    >
                      <input
                        type="radio"
                        checked={selected?._id === addr._id}
                        readOnly
                        className="w-5 h-5 text-blue-600"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{addr.name ?? "N/A"}</p>
                        <p className="text-sm text-gray-600 font-semibold">{addr.mobile ?? "No mobile"}</p>
                        <p className="text-sm text-gray-600 mt-1">{addr.address ?? "No address"}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {addr.city ?? "City"}, {addr.state ?? "State"} - {addr.pincode ?? "000000"}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* ---------- Form ---------- */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              {editing ? "Edit Address" : "Or add a new shipping address"}
            </h3>

            <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">

              {/* Name */}
              <input id="name" type="text" placeholder="Full Name"
                value={form.name} onChange={e => setField("name", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />

              {/* Mobile */}
              <input id="mobile" type="text" placeholder="Mobile Number (10 digits)"
                value={form.mobile} onChange={e => setField("mobile", e.target.value)} maxLength={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />

              {/* Address line */}
              <input id="address" type="text" placeholder="Address Line 1"
                value={form.address} onChange={e => setField("address", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />

              {/* State */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">State *</label>
                <select
                  value={form.state}
                  onChange={e => setStateName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select State</option>
                  {indianStates.map(s => (
                    <option key={s.isoCode} value={s.name}>{s.name}</option>
                  ))}
                </select>
                <input readOnly value={form.state} placeholder="Selected State"
                  className="w-full px-4 py-3 bg-blue-50 border border-blue-300 rounded-lg text-blue-800 font-medium" />
              </div>

              {/* City & Pincode */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">City *</label>
                  <select
                    value={form.city}
                    onChange={e => setField("city", e.target.value)}
                    disabled={!form.state}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">{form.state ? "Select City" : "Select State First"}</option>
                    {cities.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                  <input readOnly value={form.city} placeholder="Selected City"
                    className="w-full px-4 py-3 bg-green-50 border border-green-300 rounded-lg text-green-800 font-medium" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Pincode *</label>
                  <input id="pincode" type="text" placeholder="6-digit Pincode"
                    value={form.pincode} onChange={e => setField("pincode", e.target.value)} maxLength={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>

              {/* Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Address Type *</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Home", "Work", "Other"].map(t => (
                    <label
                      key={t}
                      className={`flex justify-center p-2 rounded border-2 cursor-pointer text-sm font-medium transition
                        ${form.type === t ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-300"}`}
                    >
                      <input type="radio" name="type" value={t} checked={form.type === t}
                        onChange={() => setType(t)} className="sr-only" />
                      {t}
                    </label>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                Save this address for future orders
              </label>
            </div>

            {/* ---------- Buttons ---------- */}
            <div className="mt-6">
              {!editing ? (
                <button onClick={add} disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-60">
                  {loading ? "Adding..." : "Add & Use This Address"}
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={update} disabled={loading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg">
                    Update
                  </button>
                  <button onClick={remove} disabled={loading}
                    className="px-6 bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg">
                    Delete
                  </button>
                  <button onClick={reset}
                    className="px-6 border-2 border-gray-400 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-12 text-right">
          <button
            onClick={goToPayment}
            disabled={!selected}
            className="px-10 py-4 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xl rounded-lg shadow-lg transition disabled:bg-gray-400"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;