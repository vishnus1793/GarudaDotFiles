import React, { useState } from 'react';
import './style.css';
import { account } from './appwrite';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Use the createSession method for login
      await account.createSession(username, password);
      // Redirect user or show success message
      console.log('Login successful!');
    } catch (err) {
      setError(err.message); // Set error message if login fails
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Use the create method for signing up
      await account.create('unique()', username, password);
      // Automatically log in after signup
      await handleLogin(e); // Reuse login method
      // Redirect user or show success message
      console.log('Signup successful!');
    } catch (err) {
      setError(err.message); // Set error message if signup fails
    }
  };

  return (
    <section>
    <span></span> 
    <span></span> 
    <span></span> 
    <span></span> 
    <span></span> 
    <span></span> 
    <span></span> 
    
    <span></span> 
    <span></span> 
    <span></span> 
    <span></span> 
    <span></span> 
    <span></span> 
    <span></span> 
    <span></span> 
    <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <span></span> <span></span> <span></span> <span></span>

      <div className="signin">
        <div className="content">
          <h2>Sign In</h2>
          {error && <p className="error">{error}</p>} {/* Show error message */}
          <div className="form">
            <div className="inputBox">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <i>Username</i>
            </div>
            <div className="inputBox">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i>Password</i>
            </div>
            <div className="links">
              <a href="#" onClick={handleLogin}>Login</a>
              <a href="#" onClick={handleSignup}>Signup</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
