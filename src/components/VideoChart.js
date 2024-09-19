import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const VideoChart = ({ data }) => {
  const chartData = {
    labels: data.map(video => video.title),
    datasets: [{
      label: 'Watch Time (hours)',
      data: data.map(video => video.watchTime),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
  };

  return <Bar data={chartData} />;
};

export default VideoChart;