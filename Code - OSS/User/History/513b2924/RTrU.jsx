import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Assuming you want to send the registration data to a server

const RegistrationForm = () => {
    const { eventName } = useParams(); // Get the event name from the URL
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            const registrationData = {
                eventName: decodeURIComponent(eventName),
                name,
                email,
            };

            // Send registration data to your API endpoint (adjust the URL as needed)
            const response = await axios.post('http://localhost:5000/api/register', registrationData);
            console.log('Registration successful:', response.data);
            // Optionally, redirect or show a success message
        } catch (error) {
            console.error('Error registering:', error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Registration for: {decodeURIComponent(eventName)}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Your Name</label>
                    <input
                        type="text"
                        className="border rounded p-2 w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Email</label>
                    <input
                        type="email"
                        className="border rounded p-2 w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                {/* Add more fields as needed */}
                <button type="submit" className="mt-4 bg-blue-600 text-white font-semibold rounded-md py-2 px-4">
                    Submit Registration
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;
