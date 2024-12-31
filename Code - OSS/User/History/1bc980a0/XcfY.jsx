import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { EventContext } from '../context/EventContext';

const Typewriter = ({ text, speed = 150 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex(index + 1);
            }, speed);
            return () => clearTimeout(timeout);
        }
    }, [index, text, speed]);

    return <h1 className="text-4xl font-extrabold text-blue-300 mb-4">{displayedText}</h1>;
};

const StudentDashboard = () => {
    const [events, setEvents] = useState([]);
    const [registeredEvents, setRegisteredEvents] = useState(new Set()); // Track registered events
    const { someContextValue } = useContext(EventContext); // Example usage
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/events');
                // Filter for approved events
                const approvedEvents = response.data.filter(event => event.status === 'Approved');
                setEvents(approvedEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

    const handleRegister = (eventName) => {
        setRegisteredEvents((prev) => new Set(prev).add(eventName)); // Add event name to registered set
        // Navigate to the registration page with event details
        navigate(`/register`, { state: { eventName } });
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-800 to-black">
            <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500 opacity-30 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white opacity-20 rounded-full filter blur-2xl animate-pulse"></div>
            <div className="relative z-10 max-w-5xl mx-auto text-center py-8">
                <Typewriter text="Welcome to the Student Dashboard" />
                <p className="text-lg text-gray-400 mb-10">
                    Explore and join college events with ease.
                </p>
            </div>
            {/* List of Approved Events */}
            <div className="relative z-10 max-w-4xl mx-auto">
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event, index) => (
                        <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-bold text-blue-300 mb-2">{event.name}</h3>
                            <p className="text-gray-400">
                                <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                            </p>
                            <p className="text-gray-300 mt-2">{event.description}</p>
                            <p className="text-sm text-gray-400 mt-2">Status: {registeredEvents.has(event.name) ? 'Registered' : event.status}</p>
                            <button
                                className="mt-4 bg-blue-600 text-white font-semibold rounded-md py-2 px-4 hover:bg-blue-700 transition duration-200"
                                onClick={() => handleRegister(event.name)} // Call handleRegister on click
                            >
                                {registeredEvents.has(event.name) ? 'Registered' : 'Register'}
                            </button>
                        </div>
                    ))}
                </div>
                {events.length === 0 && (
                    <p className="text-gray-400 mt-4">No approved events available at this time.</p>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
