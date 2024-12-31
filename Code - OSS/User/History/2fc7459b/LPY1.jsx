import React, { useState } from 'react';

const Typewriter = ({ text, speed = 150 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);
    
    React.useEffect(() => {
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

const StaffDashboard = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        name: '',
        date: '',
        description: '',
    });

    // Handles form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Adds a new event with "Pending Approval" status
    const handleSubmit = async (e) => {
      e.preventDefault();
      const newEventData = { ...newEvent, status: 'Pending Approval' };
      try {
          await fetch('/api/events', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newEventData),
          });
          // Reset form or show confirmation
      } catch (error) {
          console.error('Error submitting event:', error);
      }
  };
  
    // Updates the status of an event to "Approved" or "Rejected"
    const updateEventStatus = (index, newStatus) => {
        setEvents((prevEvents) =>
            prevEvents.map((event, i) =>
                i === index ? { ...event, status: newStatus } : event
            )
        );
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-800 to-black">
            <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500 opacity-30 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white opacity-20 rounded-full filter blur-2xl animate-pulse"></div>
            <div className="relative z-10 max-w-5xl mx-auto text-center py-8">
                <Typewriter text="Welcome to the Staff Dashboard" />
                <p className="text-lg text-gray-400 mb-10">
                    Manage and organize college events with ease.
                </p>
            </div>

            {/* Form to Create a New Event */}
            <div className="relative z-10 max-w-3xl mx-auto bg-white-800 p-10 rounded-lg shadow-lg mb-12 border-4 border-black">
                <h2 className="text-2xl font-semibold text-blue-300 mb-4">Create a New Event</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-400 mb-2">Event Name</label>
                        <input
                            type="text"
                            name="name"
                            value={newEvent.name}
                            onChange={handleInputChange}
                            style={{ width: '600px' }}
                            className="px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Event Date</label>
                        <input
                            type="date"
                            name="date"
                            value={newEvent.date}
                            onChange={handleInputChange}
                            style={{ width: '600px' }}
                            className="px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={newEvent.description}
                            onChange={handleInputChange}
                            style={{ width: '600px' }}
                            className="px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        style={{ width: '600px' }}
                        className="py-2 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Submit for approval
                    </button>
                </form>
            </div>

            {/* List of Events */}
            <div className="relative z-10 max-w-4xl mx-auto">
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event, index) => (
                        <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-bold text-blue-300 mb-2">{event.name}</h3>
                            <p className="text-gray-400">
                                <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                            </p>
                            <p className="text-gray-300 mt-2">{event.description}</p>
                            <p className="text-sm text-gray-400 mt-2">Status: {event.status}</p>
                            <div className="flex justify-around mt-4">
                                {event.status === 'Pending Approval' && (
                                    <>
                                        <button
                                            onClick={() => updateEventStatus(index, 'Approved')}
                                            className="px-4 py-1 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => updateEventStatus(index, 'Rejected')}
                                            className="px-4 py-1 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-200"
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;
