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
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const sendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/send-otp', { email });
      if (response.data.success) {
        setIsOtpSent(true);
        setErrorMessage('');
      } else {
        setErrorMessage('Failed to send OTP');
      }
    } catch (error) {
      setErrorMessage('Error sending OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/verify-otp', { email, otp });
      if (response.data.success) {
        setIsVerified(true);
        setErrorMessage('');
      } else {
        setErrorMessage('Invalid OTP');
      }
    } catch (error) {
      setErrorMessage('Error verifying OTP');
    }
  };

  const handleRegister = () => {
    if (!isVerified) {
      setErrorMessage('Please verify the OTP before registering.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    // Proceed with the registration logic (e.g., send to backend)
    console.log('Registration Successful');
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isOtpSent} // Disable email input after OTP is sent
                    />
                    {!isOtpSent && (
                      <CButton color="primary" onClick={sendOtp} disabled={!email}>
                        Send OTP
                      </CButton>
                    )}
                  </CInputGroup>

                  {isOtpSent && !isVerified && (
                    <CInputGroup className="mb-3">
                      <CInputGroupText>OTP</CInputGroupText>
                      <CFormInput
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <CButton color="primary" onClick={verifyOtp} disabled={!otp}>
                        Verify OTP
                      </CButton>
                    </CInputGroup>
                  )}

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

                  <div className="d-grid">
                    <CButton color="success" onClick={handleRegister} disabled={!isVerified}>
                      {isVerified ? 'Create Account' : 'Verify OTP First'}
                    </CButton>
                  </div>

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
