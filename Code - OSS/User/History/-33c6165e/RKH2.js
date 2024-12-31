// App.js
import React from 'react';
import PasswordManager from './components/PasswordManager';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Password Manager</h1>
      </header>
      <PasswordManager />
    </div>
  );
}

export default App;
