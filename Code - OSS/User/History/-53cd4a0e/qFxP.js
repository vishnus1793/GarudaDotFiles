import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [batteryPercent, setBatteryPercent] = useState('Loading...');
  const [isPlugged, setIsPlugged] = useState('Loading...');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchBatteryStatus = async () => {
      try {
        const response = await fetch('/battery');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.battery !== undefined) {
          setBatteryPercent(`${data.battery}%`);
          setIsPlugged(data.plugged ? "Yes" : "No");
        } else {
          setBatteryPercent(`Error: ${data.error}`);
          setIsPlugged(data.message);
        }
      } catch (error) {
        setErrorMessage('Failed to fetch battery status.');
        console.error('Error fetching battery status:', error);
      }
    };

    fetchBatteryStatus();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Battery Monitor</h1>
        {errorMessage ? (
          <p style={{ color: 'red' }}>{errorMessage}</p>
        ) : (
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
        )}
      </header>
    </div>
  );
}

export default App;
