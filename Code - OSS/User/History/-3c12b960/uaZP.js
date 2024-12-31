import React, { useState } from 'react';
import { account, databases, ID } from './lib/appwrite';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Create a new user in Appwrite Authentication
      const user = await account.create(ID.unique(), email, password, name);

      // Store user details in the database
      await databases.createDocument(
        '[YOUR_DATABASE_ID]', // Replace with your Database ID
        'users',              // Replace with your Collection ID (users collection)
        user.$id,             // Document ID, typically use the user ID
        { name, email, created_at: new Date().toISOString() }
      );

      // Show success message and clear form
      setSuccess(true);
      setError(null);
      setEmail('');
      setPassword('');
      setName('');
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Registration successful!</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
