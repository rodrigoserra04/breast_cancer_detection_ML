import React from 'react';

const SimplifiedExplanation = () => {
  // Example simplified data (grouped categories)
  const featureCategories = [
    { category: 'Size', influence: 'High', color: 'red' },
    { category: 'Shape', influence: 'Moderate', color: 'orange' },
    { category: 'Texture', influence: 'Low', color: 'green' },
  ];

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Prediction Explanation</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Key Factors in the Prediction</h3>
        <ul>
          {featureCategories.map((feature, index) => (
            <li
              key={index}
              className={`text-${feature.color}-500 text-lg mb-2`}
            >
              {feature.category}: <span className="font-semibold">{feature.influence}</span> influence
            </li>
          ))}
        </ul>
        <p className="text-gray-700 mt-4">
          These factors influenced the prediction of whether the tumor is malignant or benign.
        </p>
      </div>
    </section>
  );
};

export default SimplifiedExplanation;
