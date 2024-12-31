// server.js (add these imports at the top)
const PNR = require('./models/pnrModel'); // Adjust the path as necessary

// Inside your express app setup, add the following route:
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
