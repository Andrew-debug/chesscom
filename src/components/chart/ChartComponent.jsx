import React, { MouseEvent, useRef } from "react";
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
import {
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from "react-chartjs-2";

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
    },
    x: {
      display: false,
    },
  },
};

const white = [1, 2, 3, 4, 1, 1, 2, 3, 4, 1, 1, 2, 3, 4, 1];
const black = [-1, -2, -3, -4, -1, -1, -2, -3, -4, -1, -1, -2, -3, -4, -1];
const data = {
  labels: Array.from(white.keys()),
  datasets: [
    {
      type: "bar",
      label: "White",
      backgroundColor: "white",
      data: Array.from(white.values()),
      borderColor: "white",
      borderWidth: 2,
    },
    {
      type: "bar",
      label: "Black",
      backgroundColor: "black",
      data: Array.from(black.values()),
    },
  ],
};

export default function ChartComponent() {
  const printDatasetAtEvent = (dataset) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;

    console.log(data.datasets[datasetIndex].label);
  };

  const printElementAtEvent = (element) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];

    console.log(data.labels[index], data.datasets[datasetIndex].data[index]);
  };

  const printElementsAtEvent = (elements) => {
    if (!elements.length) return;

    console.log(elements.length);
  };

  const chartRef = useRef(null);

  const onClick = (event) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    // printDatasetAtEvent(getDatasetAtEvent(chart, event));
    // printElementAtEvent(getElementAtEvent(chart, event));
    // printElementsAtEvent(getElementsAtEvent(chart, event));
  };

  return (
    <Chart
      ref={chartRef}
      type="bar"
      onClick={onClick}
      options={options}
      data={data}
    />
  );
}
