import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './App.css'; // Link your CSS here
import '@fortawesome/fontawesome-free/css/all.min.css';

const LoginForm = () => {
    const handleGoogleSuccess = (credentialResponse) => {
        console.log('Google Login Success:', credentialResponse);
        // Handle token or call your backend API to process the token
    };

    const handleGoogleFailure = (error) => {
        console.log('Google Login Failed:', error);
    };

    return (
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <div>
                <div className="background">
                    <div className="shape"></div>
                    <div className="shape"></div>
                </div>
                <form>
                    <h3>Login Here</h3>

                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Email or Phone" id="username" />

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" id="password" />

                    <button type="submit">Log In</button>

                    <div className="social">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleFailure}
                            useOneTap
                        />
                    </div>
                </form>
            </div>
        </GoogleOAuthProvider>
    );
}

export default LoginForm;
