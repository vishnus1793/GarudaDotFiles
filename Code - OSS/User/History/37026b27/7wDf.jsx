import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import PrivateRoute from './pages/PrivateRoute';
import StudentDashboard from './pages/StudentDashboard';
import StaffDashboard from './pages/StaffDashboard';
import AdminDashboard from './pages/AdminDashboard';
import RegistrationForm from './pages/RegistrationForm'; // Import your registration form component
import EventProvider from './context/EventContext';

const App = () => {
    return (
        <Router>
            <EventProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/student-dashboard"
                        element={
                            <PrivateRoute>
                                <StudentDashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/staff-dashboard"
                        element={
                            <PrivateRoute>
                                <StaffDashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin-dashboard"
                        element={
                            <PrivateRoute>
                                <AdminDashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/register/:eventName" // Add this route for registration form
                        element={<RegistrationForm />} // Render the registration form
                    />
                </Routes>
            </EventProvider>
        </Router>
    );
};

export default App;
