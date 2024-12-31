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
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
     
      const token = jwt.sign({ id: user._id }, "jwtsecret123", { expiresIn: '1h' });
  
      
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: "pranavas.22aim@kongu.edu",   
          pass: "pranavsivakumar@1234",       
        },
      });
  
     
      const mailOptions = {
        from: "pranavas.22aim@kongu.edu",
        to: user.email,
        subject: 'Password Reset',
        html: <p>Click <a href="http://localhost:5000/reset-password/${token}">here</a> to reset your password</p>, 
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ message: 'Error sending reset link' });
        }
        res.json({ message: 'Check your email for the reset link!' });
      });
  
    } catch (error) {
      res.status(500).json({ message: 'Error sending reset link' });
    }
  });
  app.get('/reset-password/:token', (req, res) => {
    const token = req.params.token;
    console.log("Received Token for Verification (Before Decoding - GET):", token);
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(400).send('Invalid or expired token');
  
      console.log("Decoded Token (After Decoding - GET):", decoded);
  
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Password</title>
          <style>
            /* Add your CSS from the previous response here */
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
            body, html { 
              margin: 0; 
              padding: 0; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              min-height: 100vh; 
              font-family: Arial, sans-serif; 
              background-color: black; 
              overflow: hidden; 
            }
            .container { 
              position: relative; 
              z-index: 10; 
              max-width: 400px; 
              width: 100%; 
              padding: 2rem; 
              background: rgba(0, 0, 0, 0.8); 
              backdrop-filter: blur(10px); 
              border-radius: 10px; 
              box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); 
              animation: fadeIn 1s ease-in-out; 
              transition: transform 0.5s; 
            }
            .container:hover { transform: scale(1.05); }
            .title { 
              font-size: 2rem; 
              font-weight: bold; 
              text-align: center; 
              background: linear-gradient(to right, #007bff, #ffffff, #007bff); 
              color: transparent; 
              -webkit-background-clip: text; 
              background-clip: text; 
              margin-bottom: 1.5rem; 
            }
            .input { 
              width: 100%; 
              padding: 0.75rem; 
              margin-bottom: 1rem; 
              background-color: #333; 
              border: 1px solid #555; 
              color: white; 
              border-radius: 5px; 
              outline: none; 
              transition: box-shadow 0.3s; 
            }
            .input:focus { 
              box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5); 
              border-color: #007bff; 
            }
            .button { 
              width: 100%; 
              padding: 0.75rem; 
              font-size: 1rem; 
              font-weight: bold; 
              color: white; 
              background: linear-gradient(to right, #007bff, #0056b3); 
              border: none; 
              border-radius: 5px; 
              cursor: pointer; 
              transition: background 0.3s, transform 0.3s; 
            }
            .button:hover { 
              background: linear-gradient(to right, #0056b3, #004494); 
              transform: translateY(-2px); 
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2 class="title">Reset Password</h2>
            <form action="/reset-password" method="POST">
              <input type="hidden" name="token" value="${token}">
              <input type="password" name="newPassword" placeholder="Enter new password" required class="input">
              <button type="submit" class="button">Reset Password</button>
            </form>
          </div>
        </body>
        </html>
      `);
      
      
      
      
    });
  });
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  
  app.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    console.log("Received Token for Verification (Before Decoding - POST):", token);  // Debugging
  
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(400).send('Invalid or expired token');
      const userId = decoded.id;
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      try {
        const user = await User.findByIdAndUpdate(userId, { password: hashedPassword });
        if (!user) return res.status(400).send('User not found');
  
        res.send('Password successfully updated');
      } catch (error) {
        res.status(500).send('Error updating password');
      }
    });
  });
// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
