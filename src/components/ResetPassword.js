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
          navigate("/");
        }, 3000);
      } else {
        setError(data.message || "Error resetting password.");
      }
    } catch (error) {
      setError("An error occurred.");
    }
  };

  return (
    <div className="main"
      style={{
        display: "flex",
        alignItems: "center",
   
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <form
        onSubmit={handleResetPassword}
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h2>Reset Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          style={inputStyle}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          style={inputStyle}
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          style={inputStyle}
          value={formData.password_confirmation}
          onChange={(e) =>
            setFormData({ ...formData, password_confirmation: e.target.value })
          }
          required
        />
        <button type="submit" style={buttonStyle}>Reset Password</button>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "5px",
  border: "1px solid #ccc",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#007bff",
  color: "white",
  cursor: "pointer",
};

export default ResetPassword;
