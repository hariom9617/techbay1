import Navbar from '../Component/Navbar'

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
} from "@mui/material";

const Profile = () => {
  const orders = [
    { id: "#ORD-00124", date: "Oct 15, 2023", status: "Delivered", total: "$2,499.00" },
    { id: "#ORD-00119", date: "Sep 28, 2023", status: "Shipped", total: "$89.99" },
    { id: "#ORD-00105", date: "Jul 02, 2023", status: "Delivered", total: "$120.50" },
  ];

  return (
       <>

       <Navbar></Navbar>

        <div className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800">My Account</h1>

        {/* Profile Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/80"
              alt="Profile"
              className="w-20 h-20 rounded-full border border-gray-200"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>
              <p className="text-gray-500">User ID: 123-456-789</p>
              <p className="text-gray-500">john.doe@email.com</p>
            </div>
          </div>
          <Button variant="contained" color="primary" size="small">
            Edit Profile
          </Button>
        </div>

        {/* My Orders */}
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

        {/* Change Password */}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
  <TextField
    fullWidth
    label="New Password"
    type="password"
    variant="outlined"
    size="small"
    className="!m-0"
  />
  <TextField
    fullWidth
    label="Confirm New Password"
    type="password"
    variant="outlined"
    size="small"
    className="!m-0"
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
       </>
   
  );
};

export default Profile;