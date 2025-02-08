import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
const API_BASE_URL = "https://forestgreen-rail-905681.hostingersite.com/api";

const HomePage = () => {
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/user`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setFirstName(data.first_name);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="main-container main">
      <div className="content-wrapper">
        {/* Welcome Section */}
        <div className="welcome-box">
          <h1>Welcome, {firstName}</h1>
        </div>

        {/* Buttons Section */}
        <div className="input-container">
          <div className="input-box">
            <button className="btn d-flex align-items-center text-center justify-content-center" onClick={() => navigate("/search-property")}> 
           Search Property     <FaSearch className="ml-3" />
            </button>
          </div>
          <div className="input-box">
            <p className="text-center">Credits ?</p>
            <button className="btn" onClick={() => navigate("/buy-credits")}>
            Buy More Search Credits ?
            </button>
          </div>
          <div className="input-box">
            <button className="btn" onClick={() => navigate("/drafts")}>
            See Invoices
            </button>
          </div>
          <div className="input-box">
            <button className="btn" onClick={() => navigate("/account-details")}>
              View Account Details
            </button>
          </div>
          <div className="input-box">
            <button className="btn" onClick={() => navigate("/architects-review")}>
              Review Architects
            </button>
          </div>
          <div className="input-box">
            <button className="btn" onClick={() => navigate("/past-searches")}>
              View Past Searches
            </button>
          </div>
          <div className="input-box">
            <button className="btn" onClick={() => navigate("/compare-searches")}>
              Compare Search Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
