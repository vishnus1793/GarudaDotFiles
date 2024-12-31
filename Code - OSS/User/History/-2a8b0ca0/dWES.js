import React from 'react'
import { Line } from 'react-chartjs-2'

const MainChart = ({ ticketPrices }) => {
  const data = {
    labels: ticketPrices.map(item => item.stationName),
    datasets: [
      {
        label: 'Ticket Price (INR)',
        backgroundColor: 'rgba(0,123,255,0.4)',
        borderColor: 'rgba(0,123,255,1)',
        pointBackgroundColor: 'rgba(0,123,255,1)',
        pointBorderColor: '#fff',
        data: ticketPrices.map(item => item.price),
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Stations',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Ticket Price (INR)',
        },
        beginAtZero: true,
      },
    },
  }

  return <Line data={data} options={options} height={300} />
}

export default MainChart
