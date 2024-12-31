// Enrollment.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Enrollment = () => {
  const location = useLocation();
  const { event } = location.state || {};
  
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState('');

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to an API or log it
    console.log('Enrolled:', { name, email, comments, eventName: event.name });
    alert('Enrollment successful!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      {event ? (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Enrollment for {event.name}</h1>
          <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
          <p className="mt-2">{event.description}</p>
          
          {/* Enrollment Form */}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-400 mb-1" htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-700 rounded-md text-white"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-400 mb-1" htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-700 rounded-md text-white"
              />
            </div>
            
            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 text-white font-semibold rounded-md py-2 px-4 hover:bg-blue-700 transition duration-200"
            >
              Submit Enrollment
            </button>
          </form>
        </div>
      ) : (
        <p>No event selected.</p>
      )}
    </div>
  );
};

export default Enrollment;
