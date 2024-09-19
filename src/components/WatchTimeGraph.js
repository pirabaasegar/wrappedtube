import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const WatchTimeGraph = ({ data }) => {
  const chartData = {
    labels: data.map(entry => entry.date),
    datasets: [{
      label: 'Watch Time Over Time',
      data: data.map(entry => entry.watchTime),
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    }],
  };

  return <Line data={chartData} />;
};

export default WatchTimeGraph;