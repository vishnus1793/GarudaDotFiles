import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'
import axios from 'axios'

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to send OTP
  const sendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/send-otp', { email });
      if (response.data.success) {
        setIsOtpSent(true);  // Show OTP input box
        setErrorMessage('');  // Clear error if OTP sent
      } else {
        setErrorMessage('Failed to send OTP');
      }
    } catch (error) {
      setErrorMessage('Error sending OTP');
    }
  };

  // Function to verify OTP
  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/verify-otp', { email, otp });
      if (response.data.success) {
        setIsVerified(true);  // Allow further form submission
        setErrorMessage('');  // Clear error if OTP verified
      } else {
        setErrorMessage('Invalid OTP');
      }
    } catch (error) {
      setErrorMessage('Error verifying OTP');
    }
  };

  // Registration function (only after OTP verification)
  const handleRegister = () => {
    if (!isVerified) {
      setErrorMessage('Please verify the OTP before registering.');
      return;
    }
    // Proceed with the registration logic (you may want to send username, password to backend)
    console.log('Registration Successful');
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center" style={{ 
      backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLfRU-GW2jOuL26ZYxaLMTNOboK22RsCStqQ&s')`,  
    }}>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>

                  {/* Email Input */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {!isOtpSent && (
                      <CButton color="primary" onClick={sendOtp}>
                        Send OTP
                      </CButton>
                    )}
                  </CInputGroup>

                  {/* OTP Input Box (only appears when OTP is sent) */}
                  {isOtpSent && (
                    <CInputGroup className="mb-3">
                      <CInputGroupText>OTP</CInputGroupText>
                      <CFormInput
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <CButton color="primary" onClick={verifyOtp}>
                        Verify OTP
                      </CButton>
                    </CInputGroup>
                  )}

                  {/* Show Password fields after OTP is verified */}
                  {isVerified && (
                    <>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          autoComplete="new-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Repeat password"
                          autoComplete="new-password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </CInputGroup>
                    </>
                  )}

                  {/* Registration Button */}
                  <div className="d-grid">
                    <CButton color="success" onClick={handleRegister}>
                      {isVerified ? 'Create Account' : 'Verify OTP First'}
                    </CButton>
                  </div>

                  {/* Error Message Display */}
                  {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
