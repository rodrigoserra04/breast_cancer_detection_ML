import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import PatientOverview from "../Patient/PatientOverview";
import PredictionResults from "./PredictionResults";
import Recommendations from "../Analytics/Recommendations";
import SimplifiedExplanation from "./Explanations/SimplifiedExplanation";

const PatientExplanationView = () => {
  const { id } = useParams(); // Get prediction ID from the route
  const navigate = useNavigate();

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPredictionDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/predictions/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPrediction(data);
        } else {
          throw new Error("Failed to fetch prediction details.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictionDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error: {error}{" "}
        <button
          className="text-blue-500 underline hover:text-blue-600 mt-2"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow p-8 bg-white overflow-y-auto">
        {/* Patient Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Patient Overview</h2>
          <PatientOverview />
        </section>

        {/* Prediction Results */}
        {prediction && (
          <>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Prediction Results</h2>
              <PredictionResults prediction={prediction} />
            </section>

            {/* Simplified Explanation */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Simplified Explanation</h2>
              <SimplifiedExplanation prediction={prediction} />
            </section>

            {/* Recommendations */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>
              <Recommendations />
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientExplanationView;
