// PNR.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react';
import axios from 'axios'; // Ensure axios is installed

const PNR = () => {
    const [pnrNumber, setPnrNumber] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/pnr', {
                pnrNumber,
            });
            // Ensure you're checking the correct data structure returned by your backend
            setMessage(response.data.message); // response.data.message contains your success message
            setPnrNumber(''); // Clear the input field after submission
        } catch (error) {
            // Log the error to help debug
            console.error(error);
            setMessage(error.response?.data?.message || 'Error saving PNR');
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
            </CCard>
        </>
    );
};

export default PNR;
