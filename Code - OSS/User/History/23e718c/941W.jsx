import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
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

const AdminDashboard = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        name: '',
        date: '',
        description: '',
    });

    // If using context, make sure to define it here
    const { someContextValue } = useContext(EventContext); // Example usage

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/events');
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/events', newEvent);
            setEvents((prevEvents) => [...prevEvents, response.data]); // Update state with the newly saved event from the response
            setNewEvent({ name: '', date: '', description: '' }); // Reset the form
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    const handleApprove = async (eventId) => {
        try {
            const updatedEvent = { status: 'Approved' };
            await axios.patch(`http://localhost:5000/api/events/${eventId}`, updatedEvent);
            setEvents(events.map(event => event._id === eventId ? { ...event, status: 'Approved' } : event));
        } catch (error) {
            console.error("Error approving event:", error);
        }
    };

    const handleReject = async (eventId) => {
        try {
            const updatedEvent = { status: 'Rejected' };
            await axios.patch(`http://localhost:5000/api/events/${eventId}`, updatedEvent);
            setEvents(events.map(event => event._id === eventId ? { ...event, status: 'Rejected' } : event));
        } catch (error) {
            console.error("Error rejecting event:", error);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-800 to-black">
            <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500 opacity-30 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white opacity-20 rounded-full filter blur-2xl animate-pulse"></div>
            <div className="relative z-10 max-w-5xl mx-auto text-center py-8">
                <Typewriter text="Welcome to the Admin Dashboard" />
                <p className="text-lg text-gray-400 mb-10">
                    Manage and approve college events efficiently.
                </p>
            </div>
            {/* Form to Create a New Event */}
            <div className="relative z-10 max-w-3xl mx-auto bg-white-800 p-10 rounded-lg shadow-lg mb-12 border-4 border-black">
                
            </div>
            {/* List of Events */}
            <div className="relative z-10 max-w-4xl mx-auto">
                    {events.map((event, index) => (
                        <div key={event._id} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-bold text-blue-300 mb-2">{event.name}</h3>
                            <p className="text-gray-400">
                                <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                            </p>
                            <p className="text-gray-300 mt-2">{event.description}</p>
                            <p className="text-sm text-gray-400 mt-2">Status: {event.status || 'Pending Approval'}</p>
                            <div className="mt-4">
                                {event.status === 'Pending Approval' && (
                                    <div>
                                        <button
                                            onClick={() => handleApprove(event._id)}
                                            className="mr-2 py-1 px-3 bg-green-500 text-white rounded hover:bg-green-600"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(event._id)}
                                            className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

    );
};

export default AdminDashboard;
