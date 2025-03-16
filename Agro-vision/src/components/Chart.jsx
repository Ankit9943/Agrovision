import React from 'react';
import { Line } from 'react-chartjs-2';
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend,
} from 'chart.js';

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend
);

function fetchData() {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            const now = new Date(data.timestamp * 1000);
            sensorChart.data.labels.push(now.toLocaleTimeString());
            sensorChart.data.datasets[0].data.push(data.moisture);
            sensorChart.data.datasets[1].data.push(data.npk);
            sensorChart.data.datasets[2].data.push(data.water_level);
            sensorChart.data.datasets[3].data.push(data.temperature);
            sensorChart.data.datasets[4].data.push(data.humidity);
            sensorChart.update();

            // Update recommendations
            const recommendationsDiv = document.getElementById('recommendations');
            recommendationsDiv.innerHTML = data.recommendations.join('<br>');
        });
}

setInterval(fetchData, 5000);

const Chart = () => {

let data = {
  labels: [],
  datasets: [
    {
      label: "moisture",
      data: [],
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 3,
    },
    {
      label: "NPK",
      data: [],
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 3,
    },
    {
      label: "water level",
      data: [],
      borderColor: "rgba(255, 206, 86, 1)",
      borderWidth: 3,
    },
    {
      label: "Temperature",
      data: [],
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 3,
    },
    {
      label: "Humidity",
      data: [],
      borderColor: "rgba(153, 102, 255, 1)",
      borderWidth: 3,
    },
  ],
};

const options = {
    responsive: true,
    scales: {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Overall Summary Graph',
        },
    },
};




return (
    <div className="w-full">
        <Line options={options} data={data} />
    </div>
);
};

export default Chart;