const express = require('express');
const cors = require('cors');
const si = require('systeminformation');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());

// Route to get battery status
app.get('/battery', async (req, res) => {
  try {
    // Fetch battery information
    const battery = await si.battery();

    // Format the response
    res.json({
      battery: battery.hasBattery ? battery.percent : null,
      plugged: battery.acConnected,
      message: battery.hasBattery
        ? 'Battery status fetched successfully'
        : 'No battery detected on the system.',
    });
  } catch (error) {
    console.error('Error fetching battery status:', error);
    res.status(500).json({
      error: 'Failed to fetch battery status',
      message: error.message,
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
