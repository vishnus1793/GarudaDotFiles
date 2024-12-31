// server.js (or your relevant backend file)
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Define your Mongoose model
const PnrSchema = new mongoose.Schema({
    pnrNumber: String,
});

const Pnr = mongoose.model('PNR', PnrSchema);

// API endpoint to save PNR
app.post('/api/pnr', async (req, res) => {
    const { pnrNumber } = req.body;

    try {
        const newPnr = new Pnr({ pnrNumber });
        await newPnr.save();
        res.status(201).json({ message: 'PNR saved successfully!' });
    } catch (error) {
        console.error('Error saving PNR:', error);
        res.status(500).json({ message: 'Error saving PNR' });
    }
});

// Start your server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// Connect to MongoDB (ensure MongoDB is running)
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
