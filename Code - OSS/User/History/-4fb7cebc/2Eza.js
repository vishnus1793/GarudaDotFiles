import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import bodyParser from 'body-parser';

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

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
const User = mongoose.model('User', userSchema);
// Registration schema
const registrationSchema = new mongoose.Schema({
    eventName: String,
    name: String,
    email: String,
    comments: String,
    date: { type: Date, default: Date.now }
});

const Registration = mongoose.model('Registration', registrationSchema);

// Event schema
const eventSchema = new mongoose.Schema({
    name: String,
    date: Date,
    description: String,
    status: { type: String, default: 'Pending Approval' },
});
const Event = mongoose.model('Event', eventSchema);

// Register route for user registration
app.post('/api/auth/register', async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Login route for user authentication
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful', role: user.role });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Route to get all events
app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Error fetching events' });
    }
});
// Route for enrollment submission
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

// Route to add a new event
app.post('/api/events', async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error saving event:', error);
        res.status(500).json({ message: 'Error saving event' });
    }
});

// Route to update an existing event status
app.patch('/api/events/:id', async (req, res) => {
    try {
        const eventId = req.params.id; // Get the event ID from the URL
        const updateData = req.body; // Get the updated data from the request body
        const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData, { new: true }); // Update the event and return the updated document
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' }); // Handle case where event doesn't exist
        }
        res.json(updatedEvent); // Send back the updated event
    } catch (error) {
        console.error('Error updating event:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error updating event' }); // Send a server error response
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
