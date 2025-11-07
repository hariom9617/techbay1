import React, { useState, useEffect } from "react";
import Navbar from "../Component/Navbar";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useAuth } from "../Context/authcontext/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user, token, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleEditOpen = () => setOpen(true);
  const handleEditClose = () => setOpen(false);

  useEffect(() => {
    if (!loading && !token) {
      navigate("/login");
    }
  }, [loading, token, navigate]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!token) {
    return null;
  }

  const orders = [
    { id: "#ORD-00124", date: "Oct 15, 2023", status: "Delivered", total: "$2,499.00" },
    { id: "#ORD-00119", date: "Sep 28, 2023", status: "Shipped", total: "$89.99" },
    { id: "#ORD-00105", date: "Jul 02, 2023", status: "Delivered", total: "$120.50" },
  ];

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen py-10 px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">My Account</h1>

          <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src="https://via.placeholder.com/80"
                alt="Profile"
                className="w-20 h-20 rounded-full border border-gray-200"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {user?.name || "John Doe"}
                </h2>
                <p className="text-gray-500">User ID: {user?.id || "123-456-789"}</p>
                <p className="text-gray-500">{user?.email || "john.doe@email.com"}</p>
              </div>
            </div>

            <div className="flex gap-3 justify-end sm:justify-normal">
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="!text-sm"
                onClick={handleEditOpen}
              >
                Edit Profile
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                className="!text-sm"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">My Orders</h3>
            <TableContainer component={Paper} className="rounded-xl border border-gray-100">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          color={order.status === "Delivered" ? "success" : "info"}
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell>
                        <Button size="small" variant="text" color="primary">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Change Password</h3>
            <form className="space-y-4">
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                variant="outlined"
                size="small"
              />
              <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 gap-x-5 gap-y-4">
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  variant="outlined"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                  variant="outlined"
                  size="small"
                />
              </div>

              <p className="text-sm text-gray-500">
                Password must be at least 8 characters long, contain uppercase, lowercase, and a number.
              </p>
              <Button variant="contained" color="primary" type="submit">
                Reset Password
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleEditClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          className:
            "rounded-2xl !overflow-hidden shadow-lg border border-gray-100",
        }}
      >
        <DialogTitle className="!text-xl !font-semibold !text-gray-800 !bg-gray-100">
          Edit Profile
        </DialogTitle>

        <DialogContent dividers className="space-y-5 p-6 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <TextField
              fullWidth
              label="Full Name"
              defaultValue={user?.name || "John Doe"}
              variant="outlined"
              size="small"
            />
            <TextField
              fullWidth
              label="Email"
              defaultValue={user?.email || "john.doe@email.com"}
              variant="outlined"
              size="small"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <TextField
              fullWidth
              label="Phone Number"
              defaultValue={user?.phone || "+91 9876543210"}
              variant="outlined"
              size="small"
            />
            <TextField
              fullWidth
              label="City"
              defaultValue={user?.city || "Indore"}
              variant="outlined"
              size="small"
            />
          </div>

          <TextField
            fullWidth
            label="Address"
            defaultValue={user?.address || "123, MG Road, Indore"}
            variant="outlined"
            size="small"
            multiline
            rows={2}
          />
        </DialogContent>

        <DialogActions className="!bg-gray-50 !px-6 !py-3 flex justify-end gap-3">
          <Button
            onClick={handleEditClose}
            variant="outlined"
            color="error"
            className="!capitalize"
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" className="!capitalize">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
