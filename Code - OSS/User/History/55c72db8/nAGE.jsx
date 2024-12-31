import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RegisteredPeople = () => {
  const { eventId } = useParams();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${eventId}/registrations`);
        console.log("Fetched registrations:", response.data); // Debugging output
        setRegistrations(response.data);
      } catch (error) {
        console.error('Error fetching registrations:', error);
        setError('Failed to load registrations');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [eventId]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-800 to-black">
      <div className="relative z-10 max-w-5xl mx-auto text-center py-8">
        <h1 className="text-4xl font-extrabold text-blue-300 mb-4">Registered People</h1>
        <p className="text-lg text-gray-400 mb-10">List of people who have registered for the event.</p>
      </div>
      
      {loading ? (
        <p className="text-gray-400">Loading registrations...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {registrations.length > 0 ? (
              registrations.map((person, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-blue-300 mb-2">{person.name}</h3>
                  <p className="text-gray-400"><strong>Email:</strong> {person.email}</p>
                  <p className="text-sm text-gray-400 mt-2">{person.phone}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No registrations found for this event.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisteredPeople;
