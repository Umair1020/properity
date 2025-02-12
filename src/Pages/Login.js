import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://forestgreen-rail-905681.hostingersite.com/api";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await response.json();

        console.log("Login Response:", data);

        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user)); // ✅ Store user data
            setUser(data.user);
            navigate("/welcome");
        } else {
            setError(data.message || "Invalid email or password.");
        }
    } catch (error) {
        setError("An error occurred during login.");
    }
};


  useEffect(() => {
    if (user) {
      navigate("/welcome");
    }
  }, [user, navigate]);

  return (
    <div className="main d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
      <form onSubmit={handleLogin} className="form-container">
        <h2 className="text-center">Login</h2> {/* Added Heading */} <br />
        <div className="space-y-4">
          <input
            type="email"
            className="form-input"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            required
            name="password"
            className="form-input"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button type="submit" className="submit-button">
            Login
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        <p className="text-center mt-3">
          <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
        </p> {/* Added Forgot Password */}
      </form>
    </div>
  );
};

export default Login;
