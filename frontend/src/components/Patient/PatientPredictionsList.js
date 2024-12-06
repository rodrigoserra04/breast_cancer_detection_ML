import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const PatientPredictionsList = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sorting state
  const [orderBy, setOrderBy] = useState("created_at");
  const [order, setOrder] = useState("desc");

  const fetchPredictions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:8000/user/predictions/?order_by=${orderBy}&order=${order}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch predictions");
      }

      const data = await response.json();
      setPredictions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, [orderBy, order]);

  const handleSort = (column) => {
    if (orderBy === column) {
      // Toggle between ascending and descending
      setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      // Set new column and default to descending
      setOrderBy(column);
      setOrder("desc");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-blue-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error: {error}{" "}
        <button
          className="text-blue-500 underline hover:text-blue-600 mt-2"
          onClick={() => window.location.href = "/"}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Fixed Navbar */}
      <Navbar />

      <div className="flex-grow p-8 bg-white overflow-y-auto">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">My Predictions</h1>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th
                  className="p-4 cursor-pointer text-left"
                  onClick={() => handleSort("created_at")}
                >
                  Date {orderBy === "created_at" && (order === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="p-4 cursor-pointer text-left"
                  onClick={() => handleSort("prediction_result")}
                >
                  Prediction Result{" "}
                  {orderBy === "prediction_result" && (order === "asc" ? "↑" : "↓")}
                </th>
                <th className="p-4 text-left">Details</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {predictions.map((prediction) => (
                <tr
                  key={prediction.id}
                  className="border-t hover:bg-gray-100 transition"
                >
                  <td className="p-4">{new Date(prediction.created_at).toLocaleString()}</td>
                  <td className="p-4">{prediction.prediction_result}</td>
                  <td className="p-4">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => window.location.href = `/prediction-details/${prediction.id}`}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientPredictionsList;
