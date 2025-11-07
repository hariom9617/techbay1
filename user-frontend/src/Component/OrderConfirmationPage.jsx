import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const OrderConfirmPage = () => {
  const navigate = useNavigate();

  return (
   
    <div className="min-h-screen bg-gray-50">
 <Navbar/>
      
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
          
         
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Thank You for Your Order!</h1>
            <p className="text-gray-600 text-lg">
              Your order has been placed successfully. An email confirmation with the full details has been sent to your address.
            </p>
          </div>

        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-y border-gray-200 py-6">
            <div>
              <p className="text-gray-500 text-sm font-medium">Order Number</p>
              <p className="text-gray-900 font-semibold">ID-589340921</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Estimated Delivery</p>
              <p className="text-gray-900 font-semibold">June 12, 2024 - June 15, 2024</p>
            </div>
          </div>

          
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6">Order Summary</h2>

        
          <div className="space-y-6 border-b border-gray-200 pb-8">
         
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 border-2 border-solid rounded-lg"></div>
                <div>
                  <p className="font-semibold text-gray-900">Quantum Pro Laptop</p>
                  <p className="text-sm text-gray-500">Qty: 1</p>
                </div>
              </div>
              <p className="font-semibold text-gray-900">$1299.00</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 border-2 border-solid rounded-lg"></div>
                <div>
                  <p className="font-semibold text-gray-900">Aether Wireless Buds</p>
                  <p className="text-sm text-gray-500">Qty: 1</p>
                </div>
              </div>
              <p className="font-semibold text-gray-900">$149.99</p>
            </div>
          </div>

         
          <div className="py-6 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>$1448.99</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Taxes</span>
              <span>$72.45</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 pt-4 border-t border-gray-200">
              <span>Total</span>
              <span>$1531.44</span>
            </div>
          </div>

       
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-10">
            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Receipt
            </button>

            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
            >
              Continue Shopping
            </button>
          </div>

        </div>
      </main>

    </div>
  );
};

export default OrderConfirmPage;
