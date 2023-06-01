import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      display: false,
      min: -4,
      max: 4,
    },
    x: {
      display: false,
    },
  },
};

export default function ChartComponent({ gameReviewData }) {
  if (!gameReviewData) return;
  const data = {
    labels: Array.from(gameReviewData.all_moves.keys()),
    datasets: [
      {
        type: "bar",
        label: "White",
        backgroundColor: gameReviewData.all_moves.map((value) =>
          value.score > 0 ? "white" : "black"
        ),
        // borderColor: "gray",
        // borderWidth: 1,
        data: gameReviewData.all_moves.map((item) => item.score / 100),
        minBarLength: 3,
      },
    ],
  };
  return <Chart type="bar" options={options} data={data} />;
}
