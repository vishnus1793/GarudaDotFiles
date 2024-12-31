// PasswordManager.js
import React, { useState } from 'react';
import './PasswordManager.css';

function PasswordManager() {
  const [passwords, setPasswords] = useState([]);
  const [newPassword, setNewPassword] = useState('');

  const addPassword = () => {
    setPasswords([...passwords, newPassword]);
    setNewPassword('');
  };

  return (
    <div className="password-manager-container">
      <div className="add-password-form">
        <input
          type="text"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={addPassword}>Add Password</button>
      </div>
      <ul className="password-list">
        {passwords.map((password, index) => (
          <li key={index} className="password-item">
            <span className="password">{password}</span>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PasswordManager;
