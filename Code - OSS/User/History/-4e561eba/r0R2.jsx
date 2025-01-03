import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { account, ID } from './lib/appwrite';
import Register from './Register';

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
    <div class="wrapper">
        <span class="rotate-bg"></span>
        <span class="rotate-bg2"></span>

        <div class="form-box login">
            <h2 class="title animation" style="--i:0; --j:21">Login</h2>
            <form action="#">

                <div class="input-box animation" style="--i:1; --j:22">
                    <input type="text" required />
                    <label for="">Username</label>
                    <i class='bx bxs-user'></i>
                </div>

                <div class="input-box animation" style="--i:2; --j:23">
                    <input type="password" required /> 
                    <label for="">Password</label>
                    <i class='bx bxs-lock-alt'></i>
                </div>
                <button type="submit" class="btn animation" style="--i:3; --j:24">Login</button>
                <div class="linkTxt animation" style="--i:5; --j:25">
                    <p>Don't have an account? <a href="#" class="register-link">Sign Up</a></p>
                </div>
            </form>
        </div>

        <div class="info-text login">
            <h2 class="animation" style="--i:0; --j:20">Welcome Back!</h2>
            <p class="animation" style="--i:1; --j:21">Register here to enter</p>
        </div>







        <div class="form-box register">

            <h2 class="title animation" style="--i:17; --j:0">Sign Up</h2>

            <form action="#">

                <div class="input-box animation" style="--i:18; --j:1">
                    <input type="text" required>
                    <label for="">Username</label>
                    <i class='bx bxs-user'></i>
                </div>

                <div class="input-box animation" style="--i:19; --j:2">
                    <input type="email" required>
                    <label for="">Email</label>
                    <i class='bx bxs-envelope'></i>
                </div>

                <div class="input-box animation" style="--i:20; --j:3">
                    <input type="password" required>
                    <label for="">Password</label>
                    <i class='bx bxs-lock-alt'></i>
                </div>

                <button type="submit" class="btn animation" style="--i:21;--j:4">Sign Up</button>

                <div class="linkTxt animation" style="--i:22; --j:5">
                    <p>Already have an account? <a href="#" class="login-link">Login</a></p>
                </div>

            </form>
        </div>

        <div class="info-text register">
            <h2 class="animation" style="--i:17; --j:0;">Welcome Back!</h2>
            <p class="animation" style="--i:18; --j:1;">Enter The Details To Enter</p>
        </div>

    </div>

  )
};

export default App;
