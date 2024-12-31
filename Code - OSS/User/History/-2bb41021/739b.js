import React, { useState } from 'react';
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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked } from '@coreui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');

  const sendOtp = async () => {
    setIsOtpSent(true);
    const otpValue = calculateAsciiSum(email);
    setGeneratedOtp(otpValue);
    try {
      const response = await axios.post('http://localhost:5000/send-otp', { email, otp: otpValue });
      if (response.data.success) {
        setErrorMessage('');
      } else {
        setErrorMessage('Failed to send OTP');
      }
    } catch (error) {
      setErrorMessage('Error sending OTP');
    }
  };

  const calculateAsciiSum = (str) => {
    return Array.from(str).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  };

  const verifyOtp = () => {
    const expectedOtp = calculateAsciiSum(email);
    if (parseInt(otp) === expectedOtp) {
      setIsVerified(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid OTP');
    }
  };

  const handleRegister = async () => {
    if (!isVerified) {
      setErrorMessage('Please verify the OTP before registering.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', { email, password });
      if (response.data.success) {
        // Navigate to the Dashboard upon successful registration
        navigate('#');
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error during registration');
    }
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

                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <CButton 
                      color="primary" 
                      onClick={sendOtp}
                      disabled={!email}
                    >
                      Send OTP
                    </CButton>
                  </CInputGroup>

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

                  {isOtpSent && generatedOtp && (
                    <p>Generated OTP: {generatedOtp}</p>
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
                    <CButton color="success" onClick={handleRegister}>
                      {isVerified ? 'Create Account' : 'Verify OTP First'}
                    </CButton>
                  </div>

                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

export default Register;
