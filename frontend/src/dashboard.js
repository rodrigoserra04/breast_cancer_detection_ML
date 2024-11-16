import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [explanation, setExplanation] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .post(
          "http://localhost:8000/explain/",
          { features: [17.99, 10.38, 122.8, 1001.0, 0.1184, 0.2776, 0.3001, 0.1471, 0.2419, 0.07871, 
            1.095, 0.9053, 8.589, 153.4, 0.006399, 0.04904, 0.05373, 0.01587, 0.03003, 
            0.006193, 25.38, 17.33, 184.6, 2019.0, 0.1622, 0.6656, 0.7119, 0.2654, 0.4601, 
            0.1189] },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          setExplanation(response.data.explanation);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">Prediction Explanation</h2>
      <div className="mt-4">
        {explanation ? (
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(explanation).map(([key, value]) => (
              <div key={key} className="p-4 border border-gray-300 rounded">
                <p className="font-medium">{key}</p>
                <p>{value}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading explanation...</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
