import React from 'react';

const Recommendations = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-lg font-bold">Actionable Recommendations</h3>
        <ul>
          <li className="text-green-500">✔ Perform Biopsy</li>
          <li className="text-yellow-500">⚠ Schedule periodic check-ups</li>
          <li className="text-gray-500">💬 Discuss results with your doctor</li>
        </ul>
      </div>
    </section>
  );
};

export default Recommendations;
