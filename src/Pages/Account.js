// AccountTypeSelection.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const AccountTypeSelection = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    accountType: ""
  });
  const navigate = useNavigate();

  const handleAccountSelect = (accountType) => {
    setSelectedAccount(accountType);
    setFormData({...formData, accountType});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if(response.ok) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Account creation failed:", error);
    }
  };

  return (
    <div className="account-selection-container">
      {!selectedAccount ? (
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
      ) : (
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
        </form>
      )}
    </div>
  );
};

export default AccountTypeSelection;