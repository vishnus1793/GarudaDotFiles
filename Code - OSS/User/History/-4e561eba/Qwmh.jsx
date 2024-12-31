import React, { useState } from 'react';
import { account, ID } from './lib/appwrite';
import './App.css';
import { textAlign } from 'html2canvas/dist/types/css/property-descriptors/text-align';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  async function login(email, password) {
    await account.createEmailPasswordSession(email, password);
    setLoggedInUser(await account.get());
  }

  return (
    <div>
      <p>
        {loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Not logged in'}
      </p>

      <form>
        <h1 style={{textAlign:"center"}}>Login Page</h1>

      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />

        <button type="button" onClick={() => login(email, password)}>
          Login
        </button>

        <button
          type="button"
          onClick={async () => {
            await account.create(ID.unique(), email, password, name);
            login(email, password);
          }}
        >
          Register
        </button>

        <button
          type="button"
          onClick={async () => {
            await account.deleteSession('current');
            setLoggedInUser(null);
          }}
        >
          Logout
        </button>
      </form>
    </div>
  );
};

export default App;