
import React, { useState } from 'react';
import { account } from './appwrite'; // Import your configured account
import './style.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await account.createSession(username, password);
      console.log('Login successful!');
      // Redirect user or show success message
    } catch (err) {
      console.error('Error during login:', err);
      setError(err.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await account.create('unique()', username, password);
      await handleLogin(e); // Automatically log in after signup
      console.log('Signup successful!');
    } catch (err) {
      console.error('Error during signup:', err);
      setError(err.message);
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
          {error && <p className="error">{error}</p>}
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
