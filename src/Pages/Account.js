import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const AccountTypeSelection = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    accountType: "",
  });
  const [isEmailSent, setIsEmailSent] = useState(false); // Email confirmation state
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate();

  // Account type select karne ke liye
  const handleAccountSelect = (accountType) => {
    setSelectedAccount(accountType);
    setFormData({ ...formData, accountType });
    navigate("/register")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://spotcommglobal.com/backend/create-account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert(
          result.message
        ); /* "Account created successfully. Please check your email to confirm your account." */
      } else {
        alert(result.error); // "Account creation failed."
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };
  

  // Email confirmation send karne ke liye
  const handleEmailConfirmation = async () => {
    try {
      // API call to send confirmation email
      const response = await fetch("http://localhost:3005/api/send-confirmation-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        navigate("/home"); // Success hone par home page par redirect
      } else {
        setError("Failed to send confirmation email. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="account-selection-container main">

          <>
            <button
              onClick={() => handleAccountSelect("Property Search Client")}
              className="account-button property-search-button"
            >
              Property Search Client
            </button>

            {/* <button
              onClick={() => handleAccountSelect("Shatering Account")}
              className="account-button shatering-button"
              disabled
            >
              Shatering Account
            </button>

            <button
              onClick={() => handleAccountSelect("OVS Client Account")}
              className="account-button ovs-button"
              disabled
            >
              OVS Client Account
            </button> */}
          </>
       
      </div>
    </>
  );
};

export default AccountTypeSelection;
