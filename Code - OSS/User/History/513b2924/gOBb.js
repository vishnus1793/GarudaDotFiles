import React from 'react';
import { useParams } from 'react-router-dom';

const RegistrationForm = () => {
    const { eventName } = useParams(); // Get the event name from the URL

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Registration for: {decodeURIComponent(eventName)}</h2>
            <form>
                {/* Registration form fields go here */}
                <div>
                    <label className="block mb-2">Your Name</label>
                    <input type="text" className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label className="block mb-2">Email</label>
                    <input type="email" className="border rounded p-2 w-full" required />
                </div>
                {/* Add more fields as needed */}
                <button type="submit" className="mt-4 bg-blue-600 text-white font-semibold rounded-md py-2 px-4">
                    Submit Registration
                </button>
            </form>
        </div
