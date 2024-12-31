import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet'; // Import helmet

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet()); // Use helmet middleware

// Set a custom Content Security Policy
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"], // Allow resources from the same origin
        imgSrc: ["'self'", "http://localhost:5000"], // Allow images from self and your localhost
        scriptSrc: ["'self'"], // Allow scripts from self
        styleSrc: ["'self'"], // Allow styles from self
        // Add any other directives as needed
    },
}));

// In-memory user storage
let users = [];

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Register Route
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { username, email, password: hashedPassword };
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

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
