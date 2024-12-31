// server.js or the appropriate backend file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// PNR Schema
const pnrSchema = new mongoose.Schema({
    pnrNumber: { type: String, required: true },
}, { timestamps: true });

const PNR = mongoose.model('PNR', pnrSchema);

// POST route to save PNR
app.post('/api/pnr', async (req, res) => {
    const { pnrNumber } = req.body;

    const newPnr = new PNR({ pnrNumber });
    try {
        const savedPnr = await newPnr.save();
        res.status(201).json({ message: 'PNR saved successfully', data: savedPnr });
    } catch (error) {
        console.error('Error saving PNR:', error); // Log error to console
        res.status(500).json({ message: 'Error saving PNR', error });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
