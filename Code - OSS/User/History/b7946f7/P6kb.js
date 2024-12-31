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

const Page404 = () => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">ChatGpt</h1>
              <h4 className="pt-3">Ask Me Your Queries</h4>
              <p className="text-body-secondary float-start">
                The page you are looking for will help you as a friend.
              </p>
            </div>

            {/* Navigation Menu */}
            <div className="container">
              <ul className="menu">
                <div className="toggle">
                  <ion-icon name="add-outline"></ion-icon>
                </div>
                <li style={{ '--i': 0 }} className="active">
                  <a href="#">
                    <ion-icon name="home-outline"></ion-icon>
                  </a>
                </li>
                <li style={{ '--i': 1 }}>
                  <a href="#">
                    <ion-icon name="person-outline"></ion-icon>
                  </a>
                </li>
                <li style={{ '--i': 2 }}>
                  <a href="#">
                    <ion-icon name="chatbubble-outline"></ion-icon>
                  </a>
                </li>
                <li style={{ '--i': 3 }}>
                  <a href="#">
                    <ion-icon name="mail-outline"></ion-icon>
                  </a>
                </li>
                <li style={{ '--i': 4 }}>
                  <a href="#">
                    <ion-icon name="videocam-outline"></ion-icon>
                  </a>
                </li>
                <li style={{ '--i': 5 }}>
                  <a href="#">
                    <ion-icon name="camera-outline"></ion-icon>
                  </a>
                </li>
                <li style={{ '--i': 6 }}>
                  <a href="#">
                    <ion-icon name="settings-outline"></ion-icon>
                  </a>
                </li>
                <li style={{ '--i': 7 }}>
                  <a href="#">
                    <ion-icon name="key-outline"></ion-icon>
                  </a>
                </li>
                <div className="indicator"></div>
              </ul>
            </div>

            {/* Search Input Group */}
            <CInputGroup className="input-prepend mt-3">
              <CInputGroupText>
                <CIcon icon={cilMagnifyingGlass} />
              </CInputGroupText>
              <CFormInput type="text" placeholder="What are you looking for?" />
              <CButton color="info">Search</CButton>
            </CInputGroup>
          </CCol>
        </CRow>
      </CContainer>

      {/* Ionicons Scripts */}
      <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
      <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    </div>
  )
}

export default Page404
