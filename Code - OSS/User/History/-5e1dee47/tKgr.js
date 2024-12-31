// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
const bodyParser = require('body-parser'); // Import body-parser

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// MongoDB Connection
const mongoURI = 'mongodb://127.0.0.1:27017/yourDatabaseName'; // Change yourDatabaseName to your actual database name
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Define the PNR Schema
const pnrSchema = new mongoose.Schema({
    pnrNumber: { type: String, required: true },
}, { timestamps: true });

const PNR = mongoose.model('PNR', pnrSchema); // Create the model

// Root route to confirm server is running
app.get('/', (req, res) => {
    res.send('Backend Server is Running');
});

// API Endpoint to Save PNR
app.post('/api/pnr', async (req, res) => {
    const { pnrNumber } = req.body;

    try {
        const newPnr = new PNR({ pnrNumber });
        const savedPnr = await newPnr.save();
        res.status(200).json({ message: "PNR saved successfully", data: savedPnr });
    } catch (error) {
        console.error("Error saving PNR:", error);
        res.status(500).json({ message: "Error saving PNR" });
    }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
