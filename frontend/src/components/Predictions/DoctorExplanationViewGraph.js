import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registra as escalas e outros componentes necessários
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function DoctorExplanationGraph({ explanation }) {
  const data = {
    labels: Object.keys(explanation),
    datasets: [
      {
        label: "Feature Importance",
        data: Object.values(explanation),
        backgroundColor: Object.values(explanation).map((value) =>
          value > 0 ? "rgba(75, 192, 192, 0.6)" : "rgba(255, 99, 132, 0.6)"
        ),
        borderColor: Object.values(explanation).map((value) =>
          value > 0 ? "rgba(75, 192, 192, 1)" : "rgba(255, 99, 132, 1)"
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Feature Importance</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default DoctorExplanationGraph;
