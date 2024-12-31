import React from "react";
import { Line } from "react-chartjs-2";

const MainChart = ({ ticketPrices }) => {
  const data = {
    labels: ticketPrices.map((price) => price.station),
    datasets: [
      {
        label: "Ticket Prices",
        data: ticketPrices.map((price) => price.price),
        fill: false,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,0.4)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart does not stretch
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "600px", height: "400px" }}> {/* Fixed size container */}
      <Line data={data} options={options} />
    </div>
  );
};

export default MainChart;
