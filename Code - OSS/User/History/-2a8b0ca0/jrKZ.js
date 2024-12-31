import React from "react";
import { Line } from "react-chartjs-2";

const MainChart = ({ ticketPrices }) => {
  const data = {
    labels: ticketPrices.map(item => item.station),
    datasets: [
      {
        label: "Ticket Prices",
        data: ticketPrices.map(item => item.price),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Prevents growing/shrinking issues
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div id="chartContainer" style={{ height: "300px" }}> {/* Ensure a fixed height */}
      <Line id="chart" data={data} options={options} />
    </div>
  );
};

export default MainChart;
