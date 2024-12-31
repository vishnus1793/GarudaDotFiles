import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import cors from 'cors';

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Replace body-parser

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/eventManagementDB')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// User schema with roles
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    role: {
        type: String,
        enum: ['student', 'staff', 'admin'],
        default: 'student',
    },
});
userSchema.index({ email: 1 }, { unique: true }); // Unique index on email
const User = mongoose.model('User', userSchema);

// Event schema
const eventSchema = new mongoose.Schema({
    name: String,
    date: Date,
    description: String,
    status: { type: String, default: 'Pending Approval' },
});
const Event = mongoose.model('Event', eventSchema);

// Registration schema
const registrationSchema = new mongoose.Schema({
    eventName: String,
    name: String,
    email: String,
    comments: String,
    date: { type: Date, default: Date.now },
});
const Registration = mongoose.model('Registration', registrationSchema);

// Register route for user registration
app.post('/api/auth/register', async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Enrollment Route
app.post('/api/enroll', async (req, res) => {
    const { eventName, name, email, comments } = req.body;
    try {
        const newRegistration = new Registration({ eventName, name, email, comments });
        await newRegistration.save();
        res.status(201).json({ message: 'Enrollment successful' });
    } catch (error) {
        console.error('Enrollment error:', error);
        res.status(500).json({ message: 'Server error during enrollment' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong on the server.' });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
