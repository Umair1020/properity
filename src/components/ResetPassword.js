import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const API_BASE_URL = "https://forestgreen-rail-905681.hostingersite.com/api";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    token: "",
    password: "",
    password_confirmation: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Extract token from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    if (token) {
      setFormData((prevData) => ({ ...prevData, token }));
    }
  }, [location]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage("Password has been reset successfully. Please login.");
        setError("");
        setTimeout(() => {
          navigate("/"); // Redirect to login
        }, 3000);
      } else {
        setError(data.message || "Error resetting password.");
      }
    } catch (error) {
      setError("An error occurred.");
    }
  };

  return (
    <div className="main d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
      <form onSubmit={handleResetPassword} className="form-container">
        <h2 className="text-center">Reset Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="form-input"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="New Password"
          className="form-input"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="form-input"
          value={formData.password_confirmation}
          onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
          required
        />

        <button type="submit" className="submit-button">
          Reset Password
        </button>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
