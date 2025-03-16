import { useEffect, useRef, useState } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

const ENDPOINT = 'http://localhost:5000/data'

const SensorChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: [],
          datasets: [
            { label: 'Moisture', data: [], borderColor: 'rgba(75, 192, 192, 1)', borderWidth: 3 },
            { label: 'NPK', data: [], borderColor: 'rgba(54, 162, 235, 1)', borderWidth: 3 },
            { label: 'Water Level', data: [], borderColor: 'rgba(255, 206, 86, 1)', borderWidth: 3 },
            { label: 'Temperature', data: [], borderColor: 'rgba(255, 99, 132, 1)', borderWidth: 3 },
            { label: 'Humidity', data: [], borderColor: 'rgba(153, 102, 255, 1)', borderWidth: 3 },
          ],
        },
        options: {
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    }

    const fetchData = async () => {
      try {
        const response = await fetch(ENDPOINT, {
          mode:'cors',
        });

        const data = await response.json();

        if (chartInstance.current) {
          const now = new Date(data.timestamp * 1000).toLocaleTimeString();
          const { datasets, labels } = chartInstance.current.data;

          labels.push(now);
          datasets[0].data.push(data.moisture);
          datasets[1].data.push(data.npk);
          datasets[2].data.push(data.water_level);
          datasets[3].data.push(data.temperature);
          datasets[4].data.push(data.humidity);

          chartInstance.current.update();
        }

        setRecommendations(data.recommendations || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
      <div id="recommendations">
        {recommendations.map((rec, index) => (
          <p key={index}>{rec}</p>
        ))}
      </div>
    </div>
  );
};

export default SensorChart;
