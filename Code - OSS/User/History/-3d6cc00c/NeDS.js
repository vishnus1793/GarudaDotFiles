import React from 'react'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CLink,
  CRow,
  CWidgetStatsB,
  CWidgetStatsC,
  CWidgetStatsE,
  CWidgetStatsF,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cilArrowRight,
  cilBasket,
  cilBell,
  cilChartPie,
  cilMoon,
  cilLaptop,
  cilPeople,
  cilSettings,
  cilSpeech,
  cilSpeedometer,
  cilUser,
  cilUserFollow,
} from '@coreui/icons'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import { DocsExample } from 'src/components'

import WidgetsBrand from './WidgetsBrand'
import WidgetsDropdown from './WidgetsDropdown'

const Widgets = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  return (
    <CContainer>
    <CCard className="mb-4">
      <CCardHeader>
        <h3>Food Ordering Dashboard</h3>
        <p>Order food during your train journey easily from one place.</p>
      </CCardHeader>
      <CCardBody>
        <CRow>
          {/* Food Options at Next Station */}
          <CCol xs={12} md={6} xl={4}>
            <CWidgetStatsB
              color="primary"
              icon={<CIcon icon={cilBasket} height={36} />}
              value="Available at Next Station"
              title="Pizza Station"
              progress={{
                value: random(40, 80),
              }}
              text="Order now and get it delivered to your seat"
              action={<CLink className="card-footer text-center" href="#">Order Pizza <CIcon icon={cilArrowRight} /></CLink>}
            />
          </CCol>

          {/* Current Location and Food Delivery */}
          <CCol xs={12} md={6} xl={4}>
            <CWidgetStatsC
              icon={<CIcon icon={cilMap} height={36} />}
              value="Current Station: Delhi"
              title="Fast Food"
              progress={{ value: random(50, 90) }}
              text="Fast food options available nearby"
              action={<CLink className="card-footer text-center" href="#">Order Fast Food <CIcon icon={cilArrowRight} /></CLink>}
            />
          </CCol>

          {/* Healthy Food Option */}
          <CCol xs={12} md={6} xl={4}>
            <CWidgetStatsB
              color="success"
              icon={<CIcon icon={cilChartPie} height={36} />}
              value="Healthy Food"
              title="Salads & Juice"
              progress={{
                value: random(30, 70),
              }}
              text="Fresh and healthy meals delivered"
              action={<CLink className="card-footer text-center" href="#">Order Salad <CIcon icon={cilArrowRight} /></CLink>}
            />
          </CCol>
        </CRow>

        
        </CRow>
      </CCardBody>
    </CCard>
  </CContainer>
  )
}

export default Widgets
