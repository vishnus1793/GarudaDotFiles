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
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Register = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(''); // State to store the generated OTP

  // Function to send OTP
  const sendOtp = async () => {
    setIsOtpSent(true); // Show OTP input box immediately

    // Calculate the ASCII sum of the email
    const otpValue = calculateAsciiSum(email);
    setGeneratedOtp(otpValue); // Store the generated OTP in the state
    try {
      const response = await axios.post('http://localhost:5000/send-otp', { email, otp: otpValue });
      if (response.data.success) {
        setErrorMessage('');  // Clear error if OTP sent
      } else {
        setErrorMessage('Failed to send OTP');
      }
    } catch (error) {
      setErrorMessage('Error sending OTP');
    }
  };

  // Function to calculate ASCII sum
  const calculateAsciiSum = (str) => {
    return Array.from(str).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  };

  // Function to verify OTP
  const verifyOtp = () => {
    const expectedOtp = calculateAsciiSum(email); // Calculate the expected OTP based on ASCII sum

    if (parseInt(otp) === expectedOtp) { // Compare the provided OTP with the expected one
      setIsVerified(true);  // Allow further form submission
      setErrorMessage('');  // Clear error if OTP verified
    } else {
      setErrorMessage('Invalid OTP');
    }
  };

  // Registration function (only after OTP verification)
  const handleRegister = async () => {
    if (!isVerified) {
      setErrorMessage('Please verify the OTP before registering.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    // Example logic for registration
    try {
      // You can send username, email, and password to your backend
      const response = await axios.post('http://localhost:5000/register', { email, username, password });
      if (response.data.success) {
        // On successful registration, navigate to the dashboard
        navigate('/dashboard'); // Change '/dashboard' to your actual dashboard route
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

                  {/* Email Input */}
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
                      disabled={!email} // Disable button if email is empty
                    >
                      Send OTP
                    </CButton>
                  </CInputGroup>

                  {/* OTP Input Box (always appears when Send OTP is clicked) */}
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

                  {/* Display the generated OTP */}
                  {isOtpSent && generatedOtp && (
                    <p>Generated OTP: {generatedOtp}</p>  
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

export default Register;
