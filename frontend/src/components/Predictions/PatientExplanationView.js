import React from "react";

function PatientExplanation({ explanation }) {
  // Seleciona as 3 características mais importantes
  const topFeatures = Object.entries(explanation)
    .sort(([, a], [, b]) => Math.abs(b) - Math.abs(a))
    .slice(0, 3);

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Understanding Your Results</h2>
      <p className="text-gray-700 mb-4">
        The following features had the greatest influence on your diagnosis:
      </p>
      <ul className="list-disc pl-6">
        {topFeatures.map(([feature, impact], index) => (
          <li key={index} className="mb-2">
            <strong>{feature.replace(/_/g, " ")}</strong>:{" "}
            {impact > 0
              ? `This increased the likelihood of your result.`
              : `This decreased the likelihood of your result.`}
          </li>
        ))}
      </ul>
      <p className="text-gray-700 mt-4">
        Please discuss these results with your doctor for a complete
        understanding.
      </p>
    </div>
  );
}

export default PatientExplanation;
