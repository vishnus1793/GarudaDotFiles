// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { account, ID } from './lib/appwrite';
import Register from './Register';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login(email, password) {
    await account.createEmailPasswordSession(email, password);
    setLoggedInUser(await account.get());
  }

  async function logout() {
    await account.deleteSession('current');
    setLoggedInUser(null);
  }

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | <Link to="/register">Register</Link>
        </nav>

        <Routes>
          {/* Home Route - Login */}
          <Route
            path="/"
            element={
              <div>
                <p>{loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Not logged in'}</p>
                <form>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="button" onClick={() => login(email, password)}>
                    Login
                  </button>
                  <button type="button" onClick={logout}>
                    Logout
                  </button>
                </form>
              </div>
            }
          />

          {/* Register Route */}
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
