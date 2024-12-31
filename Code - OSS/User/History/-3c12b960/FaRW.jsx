import React, { useState } from 'react';
import { database, ID } from './lib/appwrite'; // Make sure to import the database

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async () => {
    setError(null); // Reset error message
    setSuccess(false); // Reset success message

    try {
      // Replace 'YOUR_COLLECTION_ID' with your actual collection ID
      await database.createDocument(
        '671f451f00175fa46d91', // Replace with your database ID
        '671f45300019f8583c05', // Replace with your collection ID
        ID.unique(), // Generates a unique ID for the document
        { name, email, password } // The data to be stored
      );
      setSuccess(true);
    } catch (err) {
      setError(err.message); // Set the error message
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Registration successful!</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="button" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default Register;
