import React from 'react';

const PredictionResults = () => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Prediction Results</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-lg font-bold">Prediction Result</h3>
        <div className="flex items-center justify-between">
          {/* Display Result */}
          <div className="text-3xl font-bold text-red-500">Malignant</div>

          {/* Circular Progress */}
          <div className="relative w-24 h-24">
            <svg className="absolute top-0 left-0" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#FF6384"
                stroke-width="2.8"
                stroke-dasharray="94, 6"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-semibold">94%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PredictionResults;
