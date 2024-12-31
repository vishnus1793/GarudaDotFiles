import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from the staff's endpoint
        const fetchData = async () => {
            try {
                const response = await fetch('/api/events'); // Adjust the endpoint as needed
                const result = await response.json();
                setData(result); // Assuming data is an array of { id, name, date, description, status }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // Update status of the item locally
    const updateItemStatus = (id, newStatus) => {
        setData(prevData =>
            prevData.map(item =>
                item._id === id ? { ...item, status: newStatus } : item
            )
        );
    };

    if (!Array.isArray(data) || data.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center pt-10">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            {/* List of Events */}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
                {data.map(item => (
                    <div key={item._id} className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-xl font-bold text-blue-300 mb-2">{item.name}</h3>
                        <p className="text-gray-400">
                            <strong>Date:</strong> {new Date(item.date).toLocaleDateString()}
                        </p>
                        <p className="text-gray-300 mt-2">{item.description}</p>
                        <p className="text-sm text-gray-400 mt-2">Status: {item.status}</p>

                        {/* Approval and Rejection Buttons */}
                        <div className="flex justify-around mt-4">
                            {item.status === 'Pending Approval' && (
                                <>
                                    <button
                                        onClick={() => updateItemStatus(item._id, 'Approved')}
                                        className="px-4 py-1 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => updateItemStatus(item._id, 'Rejected')}
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
    );
};

export default AdminDashboard;
