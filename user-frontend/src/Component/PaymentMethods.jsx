//paymentMethods


import React from "react";
import { useForm } from "react-hook-form";

const PaymentMethods = () => {
  const { register, watch, handleSubmit } = useForm();

  const selectedMethod = watch("paymentMethod");

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 border border-gray-200 shadow-md  w-full max-w-xl p-8 rounded-xl bg-white"
    >
      <h2 className="text-xl font-semibold text-gray-800">Select Payment Method</h2>

      <div className="flex flex-col gap-3">
        
        {/* Card */}
        <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            value="card"
            {...register("paymentMethod")}
            className="w-5 h-5"
          />
          <span className="text-gray-700 font-medium">Credit / Debit Card</span>
        </label>

        <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            value="cod"
            {...register("paymentMethod")}
            className="w-5 h-5"
          />
          <span className="text-gray-700 font-medium">Pay on Delivery</span>
        </label>

        <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            value="gpay"
            {...register("paymentMethod")}
            className="w-5 h-5"
          />
          <span className="text-gray-700 font-medium">Google Pay</span>
        </label>
      </div>

      {selectedMethod === "card" && (
        <div className="mt-4 p-5 border rounded-xl shadow-sm bg-gray-50">
          <h3 className="font-semibold text-gray-800 text-lg">Card Details</h3>

          <input
            type="text"
            placeholder="Card Number"
            className="border shadow-xl p-3 w-full mt-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("cardNumber")}
          />

          <div className="flex gap-3 mt-3">
            <input
              type="text"
              placeholder="MM/YY"
              className="border p-3 w-1/2 shadow-xl  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("expiry")}
            />

            <input
              type="text"
              placeholder="CVV"
              className="border p-3 w-1/2 shadow-xl  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("cvv")}
            />
          </div>

          <button className="mt-5 bg-blue-600 text-white w-full py-3 rounded-md font-semibold hover:bg-blue-700 transition">
            Pay Now
          </button>
        </div>
      )}

    
      {selectedMethod === "cod" && (
        <div className="mt-4 p-5 border rounded-xl shadow-sm bg-gray-50">
          <h3 className="font-semibold text-gray-800 text-lg">Cash on Delivery</h3>
          <p className="text-gray-600 mt-2">
            You will pay when your order is delivered.
          </p>

          <button className="mt-5 bg-green-600 text-white w-full py-3 rounded-md font-semibold hover:bg-green-700 transition">
            Continue
          </button>
        </div>
      )}

    
      {selectedMethod === "gpay" && (
        <div className="mt-4 p-5 border rounded-xl shadow-sm bg-gray-50">
          <h3 className="font-semibold text-gray-800 text-lg">Google Pay</h3>

          <input
            type="text"
            placeholder="Enter UPI ID"
            className="border p-3 w-full mt-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("upi")}
          />

          <button className="mt-5 bg-blue-600 text-white w-full py-3 rounded-md font-semibold hover:bg-blue-700 transition">
            Pay using GPay
          </button>
        </div>
      )}
    </form>
  );
};
export default PaymentMethods;
