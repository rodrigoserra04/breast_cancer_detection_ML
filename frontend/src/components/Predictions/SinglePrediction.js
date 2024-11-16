import React, { useState } from "react";

function SinglePrediction() {
  const [features, setFeatures] = useState({
    radius: "",
    texture: "",
    perimeter: "",
    area: "",
    smoothness: "",
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFeatures({
      ...features,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("http://localhost:8000/predict/", {
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
      setPrediction(data.prediction);
    } else {
      console.error("Error with prediction");
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg max-w-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Enter Tumor Features for Prediction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <input
            type="number"
            name="radius"
            value={features.radius}
            onChange={handleChange}
            placeholder="Radius"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="texture"
            value={features.texture}
            onChange={handleChange}
            placeholder="Texture"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="perimeter"
            value={features.perimeter}
            onChange={handleChange}
            placeholder="Perimeter"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="area"
            value={features.area}
            onChange={handleChange}
            placeholder="Area"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="smoothness"
            value={features.smoothness}
            onChange={handleChange}
            placeholder="Smoothness"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Loading..." : "Get Prediction"}
        </button>
      </form>

      {prediction && (
        <div className="mt-6 p-4 border-t border-gray-300">
          <h3 className="text-xl font-semibold text-center">Prediction: {prediction}</h3>
        </div>
      )}
    </div>
  );
}

export default SinglePrediction;
