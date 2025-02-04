import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AccountTypeSelection.css";
import "./PropertySearch.css";
import "./PropertyDetails.css";
import "./CompareProperties.css";
import "./AccountInfo.css";
import "./InvoiceList.css";
import "./CrimeStatistics.css";

const AccountTypeSelection = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    accountType: ""
  });
  const [isEmailSent, setIsEmailSent] = useState(false); // Email confirmation state
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate();

  // Account type select karne ke liye
  const handleAccountSelect = (accountType) => {
    setSelectedAccount(accountType);
    setFormData({...formData, accountType});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3005/api/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log(data); // Add this to debug
      
      if (response.ok) {
        setIsEmailSent(true);
      } else {
        setError(data.error || "Failed to create account. Please try again.");
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
    <div className="account-selection-container">
      {!selectedAccount ? (
        // Account type select karne ke liye buttons
        <div className="space-y-4">
          <button 
            onClick={() => handleAccountSelect("Property Search Client")}
            className="account-button property-search-button"
          >
            Property Search Client
          </button>
          
          <button
            onClick={() => handleAccountSelect("Shatering Account")}
            className="account-button shatering-button" disabled
          >
            Shatering Account
          </button>

          <button
            onClick={() => handleAccountSelect("OVS Client Account")}
            className="account-button ovs-button" disabled
          >
            OVS Client Account
          </button>
        </div>
      ) : !isEmailSent ? (
        // Create account form
        <form onSubmit={handleSubmit} className="form-container">
          <h2 className="form-title">Create {selectedAccount}</h2>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              required
              className="form-input"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />

            <input
              type="email"
              placeholder="Email"
              required
              className="form-input"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />

            <input
              type="password"
              placeholder="Password"
              required
              className="form-input"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="form-input"
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />

            <button
              type="submit"
              className="submit-button"
            >
              Create Account
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}
        </form>
      ) : (
        // Email confirmation box
        <div className="email-confirmation-box">
          <h2>Confirm Your Email</h2>
          <p>
            A confirmation link will be sent to <strong>{formData.email}</strong>.
            Click the link in the email to activate your account.
          </p>

          {/* <button
            onClick={handleEmailConfirmation}
            className="confirm-button"
          >
            Send Confirmation Email
          </button> */}

          {error && <p className="error-message">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default AccountTypeSelection;