// Enrollment.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const Enrollment = () => {
  const location = useLocation();
  const { event } = location.state || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      {event ? (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Enrollment for {event.name}</h1>
          <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
          <p className="mt-2">{event.description}</p>
          {/* Additional enrollment form fields can go here */}
        </div>
      ) : (
        <p>No event selected.</p>
      )}
    </div>
  );
};

export default Enrollment;
