import React from "react";
import classNames from "classnames";
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilCloudDownload } from "@coreui/icons";
import FoodBrand from "../widgets/FoodBrand";
import FoodDropdown from "../widgets/FoodDropdown";
import MainChart from "./MainChart";

const Dashboard = () => {
  const trainDetails = [
    { stationCode: "ALLP", stationName: "ALLEPPEY", routeNumber: 1, arrivalTime: "--", departureTime: "15:20", haltTime: "--", distance: 0, day: 1 },
    { stationCode: "SRTL", stationName: "CHERTHALA", routeNumber: 1, arrivalTime: "15:39", departureTime: "15:40", haltTime: "1", distance: 24, day: 1 },
    { stationCode: "TUVR", stationName: "TURAVUR", routeNumber: 1, arrivalTime: "15:50", departureTime: "15:51", haltTime: "1", distance: 34, day: 1 },
    { stationCode: "ERS", stationName: "ERNAKULAM JN", routeNumber: 1, arrivalTime: "16:35", departureTime: "16:40", haltTime: "5", distance: 57, day: 1 },
    { stationCode: "ERN", stationName: "ERNAKULAM TOWN", routeNumber: 1, arrivalTime: "16:50", departureTime: "16:52", haltTime: "2", distance: 60, day: 1 },
    // Add additional train details as needed
  ];

  return (
    <>
      <FoodDropdown className="mb-4" />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">Traffic</h4>
              <div className="small text-body-secondary">January - July 2023</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChart ticketPrices={trainDetails.map(train => ({ station: train.stationName, price: Math.random() * 100 }))} />
        </CCardBody>
        <CCardFooter>
          {/* Your progress bars can go here if needed */}
        </CCardFooter>
      </CCard>
      <FoodBrand className="mb-4" withCharts />
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Train Schedule</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Station Code</CTableHeaderCell>
                    <CTableHeaderCell>Station Name</CTableHeaderCell>
                    <CTableHeaderCell>Route Number</CTableHeaderCell>
                    <CTableHeaderCell>Arrival Time</CTableHeaderCell>
                    <CTableHeaderCell>Departure Time</CTableHeaderCell>
                    <CTableHeaderCell>Halt Time (Minutes)</CTableHeaderCell>
                    <CTableHeaderCell>Distance (Km)</CTableHeaderCell>
                    <CTableHeaderCell>Day</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {trainDetails.map((train, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{train.stationCode}</CTableDataCell>
                      <CTableDataCell>{train.stationName}</CTableDataCell>
                      <CTableDataCell>{train.routeNumber}</CTableDataCell>
                      <CTableDataCell>{train.arrivalTime}</CTableDataCell>
                      <CTableDataCell>{train.departureTime}</CTableDataCell>
                      <CTableDataCell>{train.haltTime}</CTableDataCell>
                      <CTableDataCell>{train.distance}</CTableDataCell>
                      <CTableDataCell>{train.day}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
