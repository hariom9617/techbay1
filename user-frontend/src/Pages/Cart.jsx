import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/authcontext/AuthContext";
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated, loading } = useAuth();
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
      return;
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!token) return;
      try {
        const response = await axios.get(
          "http://192.168.29.133:5003/api/user/cart",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCart(response.data.items || []);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
        setCartLoading(false);
      }
    };

    fetchCart();
  }, [token]);

  if (loading || cartLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading your cart...
      </div>
    );
  }

  return (
    <div className="px-4 py-2">
      <Navbar />

      <main className="flex-1 px-4 sm:px-6 lg:px-10 mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-3xl font-bold">Shopping Cart</p>
            <p className="text-black">Review and manage items in your cart.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white dark:bg-background-dark rounded-lg shadow-sm">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div
                      key={item._id || item.name}
                      className="flex flex-col sm:flex-row gap-4 px-4 py-5 justify-between items-start border-b border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-start gap-4 w-full">
                        <div
                          className="bg-center bg-cover rounded-lg h-[80px] w-[80px]"
                          style={{ backgroundImage: `url(${item.img})` }}
                        ></div>
                        <div className="flex flex-1 flex-col justify-center gap-1">
                          <p className="text-base font-medium">
                            {item.name}
                          </p>
                          <p className="text-secondary text-sm">
                            ${item.price}
                          </p>
                          <p className="text-secondary text-sm">
                            {item.desc || ""}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 mt-2 sm:mt-0">
                        <div className="flex items-center gap-2">
                          <button className="h-8 w-8 flex items-center justify-center rounded-full bg-background-light dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                            -
                          </button>
                          <input
                            type="number"
                            defaultValue={item.quantity || 1}
                            className="w-6 text-center bg-transparent border-none focus:outline-none"
                          />
                          <button className="h-8 w-8 flex items-center justify-center rounded-full bg-background-light dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                            +
                          </button>
                        </div>
                        <button className="text-destructive">
                          <span className="material-symbols-outlined cursor-pointer">
                            delete
                          </span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Your cart is empty.
                  </div>
                )}
              </div>

              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-primary text-sm font-medium"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="bg-white dark:bg-background-dark rounded-lg shadow-sm p-6 h-fit">
              <h2 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 text-secondary dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    $
                    {cart
                      .reduce((acc, item) => acc + (item.price || 0), 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$15.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>$128.52</span>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4 flex justify-between text-lg font-bold">
                <span>Order Total</span>
                <span>
                  $
                  {(
                    cart.reduce((acc, item) => acc + (item.price || 0), 0) +
                    15 +
                    128.52
                  ).toFixed(2)}
                </span>
              </div>
              <button
                className="w-full mt-6 h-12 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
