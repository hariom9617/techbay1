
import React from 'react';
import PaymentMethods from '../Component/PaymentMethods';
import Button from '@mui/material/Button';
import Navbar from '../Component/Navbar';
Navbar

const PaymentForm = () => {
  return (<>
        <Navbar></Navbar>
    <div className="mx-3 sm:mx-6 md:mx-10 lg:mx-16 xl:mx-24">

      <div className="text-3xl font-bold mt-5 ">Payment Method</div>
      <div className="text-gray-700 mt-3">All transactions are safe and secure</div>

      <div className="flex flex-col lg:flex-row justify-center mt-6">

        <div className="flex-1 w-full">
          <PaymentMethods />
        </div>

      
        <div className="w-full lg:w-80 border border-gray-200 rounded-xl shadow-sm p-4 bg-white">
          <div className="text-lg font-semibold border-b pb-2 mb-4">
            Orders
          </div>

          <div className="flex justify-center">
            <Button variant="contained">Continue</Button>
          </div>
        </div>

      </div>

    </div>
  </>
  );
};

export default PaymentForm;
