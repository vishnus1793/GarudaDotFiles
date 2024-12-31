import React from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'

const Page505 = () => {
  // Simulated error page content
  const errorMessage = (
    <div className="text-center">
      <h1 className="display-1 fw-bold">505</h1>
      <h2 className="mb-4">Oops! Internal Server Error</h2>
      <p className="lead">The server encountered an unexpected condition that prevented it from fulfilling the request.</p>
      <p className="text-muted">Please try again later.</p>
      <CButton color="primary" className="mt-4" onClick={() => window.location.reload()}>
        Reload Page
      </CButton>
    </div>
  );

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            {errorMessage}
            <CInputGroup className="mt-5">
              <CInputGroupText>
                <CIcon icon={cilMagnifyingGlass} />
              </CInputGroupText>
              <CFormInput type="text" placeholder="Search..." />
              <CButton color="info">Search</CButton>
            </CInputGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page505
