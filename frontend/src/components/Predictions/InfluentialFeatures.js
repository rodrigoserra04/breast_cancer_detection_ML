import React from 'react';

const InfluentialFeatures = () => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Influential Features</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Top Influential Features</h3>
        <table className="min-w-full divide-y divide-gray-200 text-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Feature</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Importance Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="bg-gray-50">
              <td className="px-6 py-4">Texture</td>
              <td className="px-6 py-4">Smooth</td>
              <td className="px-6 py-4">0.85</td>
            </tr>
            <tr>
              <td className="px-6 py-4">Size</td>
              <td className="px-6 py-4">2.5 cm</td>
              <td className="px-6 py-4">0.75</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4">Shape</td>
              <td className="px-6 py-4">Irregular</td>
              <td className="px-6 py-4">0.90</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default InfluentialFeatures;
