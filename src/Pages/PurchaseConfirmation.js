import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PurchaseConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { credits } = location.state || {};

  return (
    <div>
      <h1>Purchase Confirmation</h1>
      <p>You have successfully purchased {credits} credits.</p>
      <button onClick={() => navigate("/account-details")}>Return to Client Portal</button>
    </div>
  );
};

export default PurchaseConfirmation;