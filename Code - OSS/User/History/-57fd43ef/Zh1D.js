import React, { useRef } from 'react'
import classNames from 'classnames'
import html2canvas from 'html2canvas'

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
  cilCloudDownload,
} from '@coreui/icons'

import FoodBrand from '../widgets/FoodBrand'
import FoodDropdown from '../widgets/FoodDropdown'
import MainChart from './MainChart'

const Dashboard = () => {
  const chartRef = useRef(null)

  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const ticketPrices = [
    { stationName: 'ALLEPPEY', price: 50 },
    { stationName: 'CHERTHALA', price: 75 },
    { stationName: 'TURAVUR', price: 90 },
    { stationName: 'ERNAKULAM JN', price: 120 },
    { stationName: 'ERNAKULAM TOWN', price: 130 },
  ]

  const handleDownloadChart = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current)
      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = 'chart.png'
      link.click()
    }
  }

  return (
    <>
      <FoodDropdown className="mb-4" />
      <CCard className="mb-4" ref={chartRef}>
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Ticket Prices
              </h4>
              <div className="small text-body-secondary">Train Ticket Price Chart</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end" onClick={handleDownloadChart}>
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
          <MainChart ticketPrices={ticketPrices} />
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
      <FoodBrand className="mb-4" withCharts />
    </>
  )
}

export default Dashboard
