import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressForm from "../Component/AddressForm";

const CheckoutPage = () => {
  const navigate = useNavigate();


  const [addressData, setAddressData] = useState({});

  
  const handleNext = () => {
    navigate("/checkout/payment");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <AddressForm
        addressData={addressData}
        setAddressData={setAddressData}
        nextStep={handleNext}
      />
    </div>
  );
};

export default CheckoutPage;
