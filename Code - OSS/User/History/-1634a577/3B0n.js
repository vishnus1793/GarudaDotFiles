// PNR.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react';
import axios from 'axios'; // Make sure to install axios

const PNR = () => {
    const [pnrNumber, setPnrNumber] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/pnr', {
                pnrNumber,
            });
            setMessage(response.data.message); // Set success message
            setPnrNumber(''); // Clear the input field
        } catch (error) {
            // Enhanced error message handling
            if (error.response) {
                // Server responded with a status code outside the range of 2xx
                setMessage(error.response.data.message || 'Error saving PNR');
            } else if (error.request) {
                // Request was made but no response was received
                setMessage('No response from server. Please check your backend.');
            } else {
                // Something happened in setting up the request
                setMessage('Error in sending request: ' + error.message);
            }
        }
    };

    return (
        <>
            <CCard className="mb-4">
                <CCardHeader>
                    <h3>Passenger Name Record</h3>
                    {/* Display message on the screen */}
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
            </CCard>
        </>
    );
};

export default PNR;
