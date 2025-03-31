import { useEffect, useRef, useState } from "react";
import { IoWarningOutline } from "react-icons/io5"; // Import the warning icon
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

function SensorChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null); // Add error state

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
              label: "मिट्टी की नमी", // Moisture
              data: [],
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 3,
            },
            {
              label: "एनपीके", // NPK
              data: [],
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 3,
            },
            {
              label: "जल स्तर", // Water Level
              data: [],
              borderColor: "rgba(255, 206, 86, 1)",
              borderWidth: 3,
            },
            {
              label: "तापमान", // Temperature
              data: [],
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 3,
            },
            {
              label: "आर्द्रता", // Humidity
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
              text: "सेंसर अवलोकन ग्राफ", // Sensor Overview Graph
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

    const fetchData = async () => {
      try {
        const response = await fetch(ENDPOINT, { mode: "cors" });
        const data = await response.json();

        if (chartInstance.current) {
          const now = new Date().toLocaleTimeString(); // Get the current time
          const { datasets, labels } = chartInstance.current.data;

          // Ensure data doesn't grow infinitely
          if (labels.length >= MAX_DATA_POINTS) {
            labels.shift(); // Remove the oldest label
            datasets.forEach((dataset) => dataset.data.shift()); // Remove the oldest data point
          }

          labels.push(now); // Add the current time as a new label
          datasets[0].data.push(data.moisture);
          datasets[1].data.push(data.npk);
          datasets[2].data.push(data.water_level);
          datasets[3].data.push(data.temperature);
          datasets[4].data.push(data.humidity);

          chartInstance.current.update(); // Update the chart
        }

        setRecommendations(data.recommendations || []);
        setError(null); // Clear error if data fetch is successful
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("डेटा प्राप्त करने में विफल। कृपया बाद में पुनः प्रयास करें।"); // Failed to fetch data. Please try again later.
      }
    };

    fetchData(); // Fetch data immediately on mount
    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    return () => {
      clearInterval(interval); // Clear the interval on component unmount
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroy the chart instance
      }
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-none h-[500px]">
        <canvas ref={chartRef} className="w-full h-full"></canvas>
      </div>
      <div id="recommendations" className="flex-none mt-4 overflow-y-auto">
        {recommendations.map((rec, index) => (
          <p key={index} className="text-sm text-gray-700 mb-2">
            {rec}
          </p>
        ))}
      </div>
      {error && (
        <div className="flex-none mt-4 flex items-center text-red-600">
          <IoWarningOutline className="mr-2" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default SensorChart;
