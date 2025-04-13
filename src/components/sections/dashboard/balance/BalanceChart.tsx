import { useEffect, useState } from 'react';

const API = "https://quickchart.io/chart";

const BalanceChart = () => {
  const [chartUrl, setChartUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const chartConfig = {
          type: 'bar', // Show a bar chart
          data: {
            labels: [2012, 2013, 2014, 2015, 2016], // Set X-axis labels
            datasets: [
              {
                label: 'Users', // Create the 'Users' dataset
                data: [120, 60, 50, 180, 120], // Add data to the chart
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Optional styling
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
            },
          },
        };

        const response = await fetch(`${API}?chart=${encodeURIComponent(JSON.stringify(chartConfig))}&width=500&height=300&format=png`, {
          method: 'GET', // Use GET for query parameters
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const imageUrl = response.url; // The URL of the generated chart
        setChartUrl(imageUrl);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div>
      <h1>Chart</h1>
      {chartUrl ? (
        <img src={chartUrl} alt="Chart" /> // Display the chart
      ) : (
        <p>Loading chart...</p> // Show a loading message while fetching
      )}
    </div>
  );
};

export default BalanceChart;

