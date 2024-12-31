import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Registration from './pages/Registration'; // Import updated Registration component
import PrivateRoute from './pages/PrivateRoute';
import StudentDashboard from './pages/StudentDashboard';
import StaffDashboard from './pages/StaffDashboard';
import AdminDashboard from './pages/AdminDashboard';
import EventProvider from './context/EventContext';

const App = () => {
  return (
    <Router>
      <EventProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Updated path to /registration */}
          <Route path="/registration" element={<Registration />} />
          
          {/* Private Routes */}
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
        </Routes>
      </EventProvider>
    </Router>
  );
};

export default App;
