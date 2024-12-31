import React from 'react'
import classNames from 'classnames'

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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'

const Dashboard = () => {
  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const trainDetails = [
    { stationCode: 'ALLP', stationName: 'ALLEPPEY', routeNumber: 1, arrivalTime: '--', departureTime: '15:20', haltTime: '--', distance: 0, day: 1 },
    { stationCode: 'SRTL', stationName: 'CHERTHALA', routeNumber: 1, arrivalTime: '15:39', departureTime: '15:40', haltTime: '1', distance: 24, day: 1 },
    { stationCode: 'TUVR', stationName: 'TURAVUR', routeNumber: 1, arrivalTime: '15:50', departureTime: '15:51', haltTime: '1', distance: 34, day: 1 },
    { stationCode: 'ERS', stationName: 'ERNAKULAM JN', routeNumber: 1, arrivalTime: '16:35', departureTime: '16:40', haltTime: '5', distance: 57, day: 1 },
    { stationCode: 'ERN', stationName: 'ERNAKULAM TOWN', routeNumber: 1, arrivalTime: '16:50', departureTime: '16:52', haltTime: '2', distance: 60, day: 1 },
    // Add the rest of the train details similarly...
  ]

  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
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
          <MainChart />
        </CCardBody>
        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center"
          >
            {progressExample.map((item, index, items) => (
              <CCol
                className={classNames({
                  'd-none d-xl-block': index + 1 === items.length,
                })}
                key={index}
              >
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">
                  {item.value} ({item.percent}%)
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>
      <WidgetsBrand className="mb-4" withCharts />
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
  )
}

export default Dashboard
