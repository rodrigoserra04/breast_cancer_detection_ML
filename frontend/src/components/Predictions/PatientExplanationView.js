import React from 'react';
import Navbar from '../Navbar';
import PatientOverview from '../Patient/PatientOverview';
import PredictionResults from './PredictionResults';
import Recommendations from '../Analytics/Recommendations';
import SimplifiedExplanation from './Explanations/SimplifiedExplanation';

const PatientExplanationView = () => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-grow p-6">
        <PatientOverview />
        <PredictionResults />
        <SimplifiedExplanation />
        <Recommendations />
      </div>
    </div>
  );
};

export default PatientExplanationView;
