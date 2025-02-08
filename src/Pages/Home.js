import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = "https://forestgreen-rail-905681.hostingersite.com/api";
const HomePage = () => {
  const [firstName, setFirstName] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const fetchUserDetails = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
      }
    } catch (error) {
      console.error("Error fetching user details.");
    }
  };
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

        {/* Input Fields Section */}
        <div className="input-container">
          <div className="input-box">
            {/* <label htmlFor="searchProperty">Search Property</label> */}
            <input
              type="text"
              className='text-center'
              id="searchProperty"
              placeholder="Search Property "
            />
          </div>
          <div className="input-box">
            <label htmlFor="Credits" className='text-center fs-2 label'>Credits ?</label>
            <input
              type="text"
              className='text-center'
              id="drafts"
              placeholder="Buy More Search Credits ?"
            />
          </div>
          <div className="input-box">
            {/* <label htmlFor="drafts">Drafts</label> */}
            <input
              type="text"
              className='text-center'
              id="drafts"
              placeholder="Check your drafts"
            />
          </div>

          <div className="input-box">
            {/* <label htmlFor="accountInfo">See Account Information</label> */}
            <input
              type="text"
              className='text-center'
              id="accountInfo"
              placeholder="View account details"
            />
          </div>

          <div className="input-box">
            {/* <label htmlFor="architectsReview">See Architects Review</label> */}
            <input
              type="text"
              className='text-center'
              id="architectsReview"
              placeholder="Review architects"
            />
          </div>

          <div className="input-box">
            {/* <label htmlFor="pastSearches">See Past Searches</label> */}
            <input
              type="text"
              className='text-center'
              id="pastSearches"
              placeholder="View past searches"
            />
          </div>

          <div className="input-box">
            {/* <label htmlFor="compareSearches">Compare Searches</label> */}
            <input
              type="text"
              className='text-center'
              id="compareSearches"
              placeholder="Compare search results"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;