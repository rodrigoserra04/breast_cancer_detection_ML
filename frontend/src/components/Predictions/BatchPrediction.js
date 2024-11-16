import React, { useState } from "react";

function BatchPrediction() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:8000/predict_batch/", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setResults(data);
    } else {
      console.error("Error uploading file");
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg max-w-2xl">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Upload CSV for Batch Prediction
      </h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <div className="flex flex-col items-center">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded-md file:border-none cursor-pointer"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? "Uploading..." : "Upload File"}
          </button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Batch Prediction Results</h3>
          <table className="min-w-full mt-4 border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-200">Features</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-200">Prediction</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="px-4 py-2 text-sm text-gray-600">{JSON.stringify(result)}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{result.Prediction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BatchPrediction;
