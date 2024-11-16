import React from "react";

function DoctorExplanation({ explanation }) {
  if (!explanation || typeof explanation !== "object") {
    return <p>No explanation data available.</p>;
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Feature Importance</h2>
      <table className="table-auto w-full text-left border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="border border-gray-300 px-4 py-2">Feature</th>
            <th className="border border-gray-300 px-4 py-2">Impact</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(explanation).map(([feature, impact], index) => (
            <tr key={index} className="border-b">
              <td className="border border-gray-300 px-4 py-2">{feature}</td>
              <td className="border border-gray-300 px-4 py-2">
                {typeof impact === "number" && !isNaN(impact)
                  ? impact.toFixed(4)
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorExplanation;
