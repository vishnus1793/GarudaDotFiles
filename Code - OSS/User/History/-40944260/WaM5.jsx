import React from 'react';
import { useLocation } from 'react-router-dom';

const RegistrationPage = () => {
    const location = useLocation();
    const { eventName } = location.state || {}; // Retrieve event name from state

    return (
        <div>
            <h1>Register for {eventName}</h1>
            {/* Registration form logic here */}
        </div>
    );
};

export default RegistrationPage;
