import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const [data, setData] = useState([]); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/data'); 
                const result = await response.json();
                console.log(result);
                setData(result); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

   
    console.log(data); 

    if (!Array.isArray(data)) {
        return <div>No data available</div>; 
    }

    return (
        <div>
            {data.map(item => (
                <div key={item.id}>{item.name}</div>
            ))}
        </div>
    );
};

export default AdminDashboard;
