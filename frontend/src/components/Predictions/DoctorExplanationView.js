import React from 'react';
import Navbar from '../Navbar';
import PredictionResults from './PredictionResults';
import InfluentialFeatures from './InfluentialFeatures';
import Recommendations from '../Analytics/Recommendations';
import PatientOverview from '../Patient/PatientOverview';

const DoctorExplanationView = ({ features}) => {
  return (
    
  <div className="flex h-screen">
    <div className="w-64 bg-blue-600 text-white">
      <Navbar />
    </div>
    <div className="flex-grow p-6">
      <PatientOverview />
      <PredictionResults />
      <InfluentialFeatures />
      <Recommendations />
    </div>
  </div>
  );
};

export default DoctorExplanationView;
