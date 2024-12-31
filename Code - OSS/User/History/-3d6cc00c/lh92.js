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
import CIcon from '@coreui/icons-react'
import { cilBasket, cilArrowRight, cilChartPie, cilFastfood, cilMap } from '@coreui/icons'

const FoodDashboard = () => {
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

          <CRow>
            {/* Beverage Options */}
            <CCol xs={12} md={6} xl={4}>
              <CWidgetStatsE
                color="warning"
                icon={<CIcon icon={cilFastfood} height={36} />}
                value="Cold Drinks"
                title="Beverages"
                progress={{
                  value: random(20, 60),
                }}
                text="Cool down with refreshing drinks"
                action={<CLink className="card-footer text-center" href="#">Order Drinks <CIcon icon={cilArrowRight} /></CLink>}
              />
            </CCol>

            {/* Popular Restaurants */}
            <CCol xs={12} md={6} xl={4}>
              <CWidgetStatsF
                icon={<CIcon icon={cilUser} height={36} />}
                value="Popular: KFC"
                title="Fried Chicken"
                progress={{
                  value: random(30, 80),
                }}
                text="Fried Chicken delivered to your seat"
                action={<CLink className="card-footer text-center" href="#">Order KFC <CIcon icon={cilArrowRight} /></CLink>}
              />
            </CCol>

            {/* Next Available Station */}
            <CCol xs={12} md={6} xl={4}>
              <CWidgetStatsC
                icon={<CIcon icon={cilFastfood} height={36} />}
                value="Next Stop: Mumbai"
                title="Biryani Express"
                progress={{ value: random(50, 90) }}
                text="Order Biryani before arrival"
                action={<CLink className="card-footer text-center" href="#">Order Biryani <CIcon icon={cilArrowRight} /></CLink>}
              />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default FoodDashboard
