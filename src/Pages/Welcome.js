// WelcomePage.jsx (React)
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get the name parameter from the URL
    const params = new URLSearchParams(location.search);
    setUserName(params.get("name"));
  }, [location]);

  const handleNext = () => {
    navigate("/home");
  };

  return (
    <div className="welcome-container account-selection-container main">
      <h1 className="fw-bold">Welcome, {userName}!</h1>
      <h3 className="fs-1">Thank you For Confirming
      Your Account</h3>
      <h2 className="fw-bold fs-3">Continue to Client Portat</h2>
      <button className="master-form-submit-button mt-4 fi-btn fi-btn-size-md relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus:ring-2 disabled:pointer-events-none disabled:opacity-70 rounded-lg fi-btn-color-accent gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-accent-600 text-white hover:bg-accent-500 dark:bg-accent-500 dark:hover:bg-accent-400 focus:ring-accent-500" onClick={handleNext}>Next</button>
    </div>
  );
};

export default WelcomePage;
