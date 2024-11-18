import React from 'react';

const PatientOverview = () => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Patient Overview</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-lg font-bold">Patient Details</h3>
        <p className="text-gray-700">Name: <span className="font-semibold">Jane Doe</span></p>
        <p className="text-gray-700">Age: <span className="font-semibold">45</span></p>
        <p className="text-gray-700">Medical ID: <span className="font-semibold">123456</span></p>
        <h4 className="text-lg font-semibold mt-4">Recent Medical History</h4>
        <ul className="list-disc list-inside text-gray-600">
          <li>Annual Checkup - 2023</li>
          <li>Mammogram - 2022</li>
          <li>Biopsy - 2021</li>
        </ul>
      </div>
    </section>
  );
};

export default PatientOverview;
