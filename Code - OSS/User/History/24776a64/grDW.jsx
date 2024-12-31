import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Install axios if not already installed
import './Signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Sending data to backend
      const response = await axios.post('http://localhost:5000/register', {
        username: name, // Ensure this matches your backend
        email: email,
        password: password,
      });

      // Check if the status code indicates success
      if (response.status === 201) {
        navigate('/dashboard'); // Redirect to dashboard after successful signup
      } else {
        setError(response.data.message); // Handle any errors from the backend
      }
    } catch (err) {
      // Display any error that occurs during signup
      if (err.response) {
        setError(err.response.data.message || 'Signup failed. Please try again.');
      } else {
        setError('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-card" onSubmit={handleSignup}>
        <h2 className="signup-title">Create an Account</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="signup-input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signup-input"
          required
        />
       
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
