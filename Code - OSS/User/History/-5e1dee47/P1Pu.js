// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PNR = require('./models/pnrModel'); // Adjust the path as necessary

const app = express(); // Initialize the Express app
const PORT = 5000; // Set your preferred port

// Middleware
app.use(bodyParser.json()); // For parsing application/json

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/your_database_name', { // Replace with your database name
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// API Endpoint to save PNR
app.post('/api/pnr', async (req, res) => {
    const { pnrNumber } = req.body;

    try {
        const newPNR = new PNR({ pnrNumber });
        await newPNR.save();
        res.status(201).json({ message: 'PNR saved successfully', data: newPNR });
    } catch (error) {
        res.status(400).json({ message: 'Error saving PNR', error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
