import React, { useEffect, useState } from 'react';
// Assuming Typewriter component is extracted to its own file

const AdminDashboard = () => {
    const [events, setEvents] = useState([]);

    // Fetch events created by staff when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/events'); // Adjust API endpoint as needed
                const result = await response.json();
                setEvents(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // Update the event status locally
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
                <Typewriter text="Welcome to the Admin Dashboard" />
                <p className="text-lg text-gray-400 mb-10">
                    Review and manage events created by staff.
                </p>
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
                            
                            {/* Approval and Rejection Buttons */}
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

export default AdminDashboard;
