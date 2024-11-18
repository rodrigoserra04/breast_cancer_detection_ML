import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { format } from 'date-fns';

const PredictionsPage = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch predictions from API when the component mounts
  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await fetch('http://localhost:8000/predictions/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch predictions');
        }

        const data = await response.json();
        setPredictions(data);
      } catch (err) {
        setError('Error fetching predictions: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-blue-600 text-white">
        <Navbar />
      </div>
      
      <div className="flex-grow p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Prediction Results</h2>
        <p className="text-gray-600 mb-6">Here are all the predictions generated in the system.</p>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-blue-100">
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">User ID</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Input Features</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Prediction Result</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Created At</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((prediction) => (
                <tr key={prediction.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-600">{prediction.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{prediction.user_id}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{prediction.input_features}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{prediction.prediction_result}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {format(new Date(prediction.created_at), 'MMM dd, yyyy HH:mm:ss')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PredictionsPage;
