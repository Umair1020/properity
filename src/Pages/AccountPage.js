import React, { useEffect, useState } from "react";

const API_BASE_URL = "https://forestgreen-rail-905681.hostingersite.com/api";

const AccountPage = () => {
  const [accountDetails, setAccountDetails] = useState(null);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/account-details`, {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setAccountDetails(data);
        }
      } catch (error) {
        console.error("Error fetching account details", error);
      }
    };
    fetchAccountDetails();
  }, []);

  return (
    <div>
      <h1>Account Details</h1>
      {accountDetails ? (
        <pre>{JSON.stringify(accountDetails, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AccountPage;
