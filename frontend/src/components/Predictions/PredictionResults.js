import React from "react";

const PredictionResults = ({ prediction }) => {
  const { prediction_result, input_features, confidence_score } = prediction;

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Prediction Results</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-lg font-bold">Prediction Result</h3>
        <div className="flex items-center justify-between">
          {/* Display Result */}
          <div
            className={`text-3xl font-bold ${
              prediction_result === "Malignant" ? "text-red-500" : "text-green-500"
            }`}
          >
            {prediction_result}
          </div>

          {/* Circular Progress */}
          <div className="relative w-24 h-24">
            <svg className="absolute top-0 left-0" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#FF6384"
                strokeWidth="2.8"
                strokeDasharray={`${confidence_score}, ${100 - confidence_score}`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-semibold">{confidence_score}%</span>
            </div>
          </div>
        </div>

        {/* Input Features */}
        <h4 className="mt-6 text-lg font-semibold">Input Features</h4>
        <pre className="bg-gray-100 p-4 rounded-md text-sm">
          {JSON.stringify(input_features, null, 2)}
        </pre>
      </div>
    </section>
  );
};

export default PredictionResults;
