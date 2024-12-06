import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BatchPrediction from "./components/Predictions/BatchPrediction";
import Login from "./Auth/Login";
import DoctorExplanationView from "./components/Predictions/DoctorExplanationView";
import PatientExplanationView from "./components/Predictions/PatientExplanationView";
import BreastCancerPredictionForm from "./components/Predict/BreastCancerPredictionForm";
import PredictionsPage from "./components/Predictions/Predictions";
import ProtectedRoute from "./Auth/ProtectedRoute";
import PublicRoute from "./Auth/PublicRoutes";

const features = [
  17.99, 10.38, 122.8, 1001.0, 0.1184, 0.2776, 0.3001, 0.1471, 0.2419, 0.07871, 
  1.095, 0.9053, 8.589, 153.4, 0.006399, 0.04904, 0.05373, 0.01587, 0.03003, 
  0.006193, 25.38, 17.33, 184.6, 2019.0, 0.1622, 0.6656, 0.7119, 0.2654, 0.4601, 
  0.1189
]

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }/>
          <Route path="/" element={
              <ProtectedRoute>
                <BreastCancerPredictionForm/>
              </ProtectedRoute>
            }
          />
          <Route path="/batch-upload" element={
              <ProtectedRoute>
                <BatchPrediction/>
              </ProtectedRoute>
            }
          />
          <Route path="/predict" element={
              <ProtectedRoute>
                <BreastCancerPredictionForm/>
              </ProtectedRoute>
            }
          />
          <Route path="/predictions" element={
              <ProtectedRoute>
                <PredictionsPage/>
              </ProtectedRoute>
            }
          />
          <Route path="/explain-doctor" element={
              <ProtectedRoute>
                <DoctorExplanationView features={features}/>
              </ProtectedRoute>
            }
          />
          <Route path="/explain-patient" element={
              <ProtectedRoute>
                <PatientExplanationView features={features}/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
