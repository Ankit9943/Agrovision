import { useEffect, useRef, useState, useCallback } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend
);

const ENDPOINT = "https://agrovision-contributed.onrender.com/data";
const MAX_DATA_POINTS = 10;
const POLLING_INTERVAL = 5000; // 5 seconds

function SensorChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [recommendations, setRecommendations] = useState([]);
  const abortControllerRef = useRef(null);

  const fetchData = useCallback(async () => {
    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    
    try {
      const response = await fetch(ENDPOINT, { 
        mode: "cors",
        signal: abortControllerRef.current.signal
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();

      if (chartInstance.current && data.timestamp) {
        const now = new Date(data.timestamp * 1000).toLocaleTimeString();
        const { datasets, labels } = chartInstance.current.data;

        // Ensure data doesn't grow infinitely
        if (labels.length >= MAX_DATA_POINTS) {
          labels.shift();
          datasets.forEach((dataset) => dataset.data.shift());
        }

        labels.push(now);
        datasets[0].data.push(data.moisture);
        datasets[1].data.push(data.npk);
        datasets[2].data.push(data.water_level);
        datasets[3].data.push(data.temperature);
        datasets[4].data.push(data.humidity);

        chartInstance.current.update('none'); // Disable animation for better performance
      }

      setRecommendations(data.recommendations || []);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error("Error fetching data:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "Moisture",
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
              label: "Water Level",
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
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true },
          },
          plugins: {
            title: {
              display: true,
              text: " Sensor Overview Graph ",
            },
            legend: {
              display: true,
              position: "bottom",
              labels: { usePointStyle: true },
            },
          },
        },
      });
    }

    // Initial fetch
    fetchData();
    
    const interval = setInterval(fetchData, POLLING_INTERVAL);

    return () => {
      clearInterval(interval);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [fetchData]);

  return (
    <div className="w-full h-[250px] md:h-[400px] lg:h-[500px] overflow-hidden">
      <canvas ref={chartRef} className="w-full h-full"></canvas>
      <div id="recommendations" className="mt-4">
        {recommendations.map((rec, index) => (
          <p key={index} className="text-sm text-gray-700">
            {rec}
          </p>
        ))}
      </div>
    </div>
  );
}

export default SensorChart;
