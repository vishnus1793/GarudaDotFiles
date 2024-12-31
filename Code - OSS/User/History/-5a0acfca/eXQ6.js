import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// In-memory user storage
let users = [];
// In-memory event storage (simulating directory structure or events)
let events = [];

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Event Management API');
});

// Register Route
app.post('/register', async (req, res) => {
    const { name, email, username, password } = req.body;
    try {
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { name, email, username, password: hashedPassword };
        users.push(newUser); // Save user to the in-memory storage

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = users.find(user => user.username === username);
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Middleware for token verification
const verifyToken = (req, res, next) => {
    const token = req.body.token || req.headers.authorization;
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

// Create Event Route (only accessible to logged-in users)
app.post('/events', verifyToken, (req, res) => {
    const { eventName, date } = req.body;

    try {
        // Create the event
        events.push({ createdBy: req.userId, eventName, date });
        res.status(201).json({ message: `Event '${eventName}' created successfully by ${req.userId} on ${date}` });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// List All Events (with error handling for files)
app.get('/events', verifyToken, (req, res) => {
    try {
        if (events.length === 0) {
            return res.status(404).json({ message: 'No events found' });
        }
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Check file or directory structure (simulating events or folder structure)
app.get('/file-structure', verifyToken, (req, res) => {
    const directoryPath = path.join(__dirname, 'Documents/Event');

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ message: `Error opening directory: ${directoryPath}`, error: err.message });
        }

        if (files.length === 0) {
            return res.status(404).json({ message: 'No files or directories found' });
        }

        res.json({ files });
    });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
