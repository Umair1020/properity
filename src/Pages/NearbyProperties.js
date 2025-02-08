import React, { useState, useEffect } from "react";
import axios from "axios";

const NearbyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = "Oz1EN9VNvYbwASZtTiKRzIVOSafz-AXrL-qzS6Yx_sw";  // Make sure the API key is valid

    const fetchProperties = async () => {
      try {
        // Replace with the correct endpoint, such as a property search by location
        const response = await axios.get(
          "https://api.data.street.co.uk/street-data-api/v2/", // Placeholder URL
          {
            params: {
              "location": "53.481803,-2.235764",  // Example location (latitude, longitude)
              "radius": "500",  // Example radius in meters
              "fields[property]": "address,price",  // Specify the fields you want
              "tier": "basic",  // Optional: specify data tier
            },
            headers: {
              "x-api-key": apiKey,
              "Accept": "*/*",
            },
          }
        );

        setProperties(response.data);
        setLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setError(err.response ? err.response.data.detail : "Unknown error");
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);  // Empty dependency array to run once

  if (loading) return <p>Loading property data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Nearby Properties</h2>
      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            <strong>{property.name}</strong> - {property.address} - Price: £{property.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NearbyProperties;
