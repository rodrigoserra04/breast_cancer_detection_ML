import React, { useState } from "react";
import DoctorExplanation from "./DoctorExplanationView";
import DoctorExplanationGraph from "./DoctorExplanationViewGraph";
import PatientExplanation from "./PatientExplanationView";

function Explanation({ features, userType }) {
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/explain/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          features: Object.values(features),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setExplanation(data.explanation);
      } else {
        console.error("Error fetching explanation");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-3xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Explanation of Prediction
        </h2>
        <p className="text-gray-600 text-lg">
          Click the button below to get the feature importance and explanation
          for your prediction.
        </p>
      </div>

      {/* Explain Prediction Button */}
      <div className="text-center">
        <button
          onClick={handleExplain}
          disabled={loading}
          className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition duration-200"
        >
          {loading ? "Explaining..." : "Explain Prediction"}
        </button>
      </div>

      {/* Explanation for doctors */}
      {explanation && userType === "doctor" && (
        <div className="mt-8">
          <div className="bg-gray-100 p-6 rounded-md shadow-sm mb-6">
            <DoctorExplanation explanation={explanation} />
          </div>
          <div className="bg-gray-100 p-6 rounded-md shadow-sm">
            <DoctorExplanationGraph explanation={explanation} />
          </div>
        </div>
      )}

      {/* Explanation for patients */}
      {explanation && userType === "patient" && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Key Features Affecting Your Prediction
          </h3>
          <ul className="list-disc list-inside bg-gray-50 p-4 rounded-md text-sm text-gray-700">
            <PatientExplanation explanation={explanation} />
            {Object.entries(explanation)
              .slice(0, 5) // Show only top 5 features
              .map(([feature, impact], index) => (
                <li key={index} className="mb-2">
                  <strong className="text-gray-800">{feature}</strong>:{" "}
                  <span className="text-gray-600">
                    {typeof impact === "number" && !isNaN(impact)
                      ? impact.toFixed(4)
                      : "N/A"}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Explanation;
