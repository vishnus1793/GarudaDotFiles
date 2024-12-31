// PNR.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react';
import axios from 'axios'; // Make sure to install axios

const PNR = () => {
    const [pnrNumber, setPnrNumber] = useState('');
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState([]); // State to hold search history

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/pnr', {
                pnrNumber,
            });
            setMessage(response.data.message); // Set success message

            // Add PNR to history if successful and not already present
            setHistory((prevHistory) => {
                const isAlreadyInHistory = prevHistory.some(
                    (entry) => entry.pnrNumber === pnrNumber
                );

                if (!isAlreadyInHistory) {
                    return [
                        ...prevHistory,
                        { pnrNumber, message: response.data.message }
                    ];
                }

                return prevHistory;
            });

            setPnrNumber(''); // Clear the input field
        } catch (error) {
            // Enhanced error message handling
            if (error.response) {
                setMessage(error.response.data.message || 'Error saving PNR');
            } else if (error.request) {
                setMessage('No response from server. Please check your backend.');
            } else {
                setMessage('Error in sending request: ' + error.message);
            }
        }
    };

    return (
        <>
            <CCard className="mb-4">
                <CCardHeader>
                    <h3>Passenger Name Record</h3>
                    {message && <div className="alert alert-info">{message}</div>}
                    <div className="c-formContainer">
                        <form className="c-form" onSubmit={handleSubmit}>
                            <input
                                className="c-form__input"
                                placeholder="Enter PNR Number"
                                type="text"
                                value={pnrNumber}
                                onChange={(e) => setPnrNumber(e.target.value)}
                                required
                            />
                            <button className="c-form__button" type="submit">Send</button>
                        </form>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <h5>Search History</h5>
                    {history.length > 0 ? (
                        <ul className="c-form__history">
                            {history.map((entry, index) => (
                                <li key={index}>
                                    <strong>PNR:</strong> {entry.pnrNumber} - <strong>Message:</strong> {entry.message}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No search history available.</p>
                    )}
                </CCardBody>
            </CCard>
        </>
    );
};

export default PNR;
