import React, { useState } from "react";
import Navbar from "../Navbar";

function BreastCancerPredictionForm() {
  const featureNames = [
    "Mean Radius",
    "Mean Texture",
    "Mean Perimeter",
    "Mean Area",
    "Mean Smoothness",
    "Mean Compactness",
    "Mean Concavity",
    "Mean Concave Points",
    "Mean Symmetry",
    "Mean Fractal Dimension",
    "Radius Error",
    "Texture Error",
    "Perimeter Error",
    "Area Error",
    "Smoothness Error",
    "Compactness Error",
    "Concavity Error",
    "Concave Points Error",
    "Symmetry Error",
    "Fractal Dimension Error",
    "Worst Radius",
    "Worst Texture",
    "Worst Perimeter",
    "Worst Area",
    "Worst Smoothness",
    "Worst Compactness",
    "Worst Concavity",
    "Worst Concave Points",
    "Worst Symmetry",
    "Worst Fractal Dimension",
  ];

  const [features, setFeatures] = useState(Array(30).fill(""));
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (index, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          features: features.map(Number),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPrediction(data.prediction);
      } else {
        setError("Failed to fetch the prediction. Please check your inputs.");
      }
    } catch (err) {
      setError("An error occurred while making the prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full">
      {/* Navbar */}
      <div className="w-64 bg-blue-600 text-white">
        <Navbar />
      </div>

      {/* Main Form Section */}
      <div className="flex-grow p-8 bg-gray-100">
        <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Breast Cancer Prediction
          </h2>
          <p className="text-gray-600 mb-8">
            Enter the required features below to predict whether the breast
            cancer is malignant or benign.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featureNames.map((featureName, index) => (
                <div key={index} className="flex flex-col">
                  <label
                    className="text-gray-700 font-medium mb-2"
                    htmlFor={`feature-${index}`}
                  >
                    {featureName}:
                  </label>
                  <input
                    id={`feature-${index}`}
                    type="number"
                    step="any"
                    value={features[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? "Predicting..." : "Predict Breast Cancer"}
            </button>
          </form>

          {/* Prediction Result */}
          {prediction && (
            <div className="mt-8 p-4 bg-green-100 text-green-800 font-medium rounded-md">
              Prediction Result:{" "}
              <strong>
                {prediction === "Malignant"
                  ? "Malignant Breast Cancer"
                  : "Benign Breast Cancer"}
              </strong>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-8 p-4 bg-red-100 text-red-800 font-medium rounded-md">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BreastCancerPredictionForm;
