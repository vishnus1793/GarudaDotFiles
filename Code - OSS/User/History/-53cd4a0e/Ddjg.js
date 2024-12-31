import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  // State variables to store battery info
  const [batteryPercent, setBatteryPercent] = useState('Loading...');
  const [isPlugged, setIsPlugged] = useState('Loading...');

  // Fetch battery status from Flask backend when the component mounts
  useEffect(() => {
    const fetchBatteryStatus = async () => {
      try {
        const response = await fetch('/battery');
        const data = await response.json();

        if (data.battery !== undefined) {
          setBatteryPercent(`${data.battery}%`);
          setIsPlugged(data.plugged ? "Yes" : "No");
        } else {
          setBatteryPercent(`Error: ${data.error}`);
          setIsPlugged(data.message);
        }
      } catch (error) {
        console.error('Error fetching battery status:', error);
      }
    };

    fetchBatteryStatus();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  return (
    <div className="App">
      <header className="App-header">
        <h1>Battery Monitor</h1>
        <table className="battery-table">
          <thead>
            <tr>
              <th>Battery Status</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Battery:</td>
              <td>{batteryPercent}</td>
            </tr>
            <tr>
              <td>Plugged:</td>
              <td>{isPlugged}</td>
            </tr>
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;