import React from "react";

const SimplifiedExplanation = ({ prediction }) => {
  const { prediction_result } = prediction;

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Simplified Explanation</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-lg font-bold">Understanding the Prediction</h3>
        <p className="text-gray-700 mt-4">
          Based on the provided data, the prediction indicates that the tumor is{" "}
          <strong
            className={
              prediction_result === "Malignant" ? "text-red-500" : "text-green-500"
            }
          >
            {prediction_result}.
          </strong>
        </p>
        {prediction_result === "Malignant" ? (
          <p className="text-gray-700 mt-2">
            This suggests that immediate follow-up and medical intervention are
            recommended.
          </p>
        ) : (
          <p className="text-gray-700 mt-2">
            This suggests that the tumor is likely benign. However, regular
            check-ups are still advised.
          </p>
        )}
      </div>
    </section>
  );
};

export default SimplifiedExplanation;
