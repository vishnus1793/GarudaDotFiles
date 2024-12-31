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

const Page500 = () => {
  // Simulated dashboard content
  const dashboardContent = (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard. Here you can manage your tasks and view analytics.</p>
      <ul>
        <li>Task 1</li>
        <li>Task 2</li>
        <li>Task 3</li>
      </ul>
    </div>
  );

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <span className="clearfix">
              <h1 className="float-start display-3 me-4"></h1>
              <h4 className="pt-3">Ratings</h4>
              <p className="text-body-secondary float-start">
                The page you are looking for is to Find Ratings.
              </p>
            </span>
            <CInputGroup className="input-prepend">
              <CInputGroupText>
                <CIcon icon={cilMagnifyingGlass} />
              </CInputGroupText>
              <CFormInput type="text" placeholder="What are you looking for?" />
              <CButton color="info">Search</CButton>
            </CInputGroup>
          </CCol>
        </CRow>
        <CRow className="mt-4">
          <CCol md={8}>
            {dashboardContent}
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page500
