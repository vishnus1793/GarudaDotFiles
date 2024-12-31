import React from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CWidgetStatsF,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilBasket,
  cilUserFollow,
  cilLaptop,
} from '@coreui/icons';

const Widgets = () => {
  return (
    <CCard className="mb-4">
      <CCardHeader>Popular Food Ordering Companies</CCardHeader>
      <CCardBody>
        <CRow>
          {/* Zomato */}
          <CCol sm={6} lg={3}>
            <CWidgetStatsF
              icon={<CIcon icon={cilBasket} height={36} />}
              title="Zomato"
              value="Food Delivery"
              color="primary"
              footer="India's top food ordering platform."
            />
          </CCol>
          {/* Swiggy */}
          <CCol sm={6} lg={3}>
            <CWidgetStatsF
              icon={<CIcon icon={cilUserFollow} height={36} />}
              title="Swiggy"
              value="Food & Groceries"
              color="warning"
              footer="Widespread delivery network."
            />
          </CCol>
          {/* Uber Eats */}
          <CCol sm={6} lg={3}>
            <CWidgetStatsF
              icon={<CIcon icon={cilLaptop} height={36} />}
              title="Uber Eats"
              value="Global Food Delivery"
              color="success"
              footer="Operates in multiple countries."
            />
          </CCol>
          {/* DoorDash */}
          <CCol sm={6} lg={3}>
            <CWidgetStatsF
              icon={<CIcon icon={cilBasket} height={36} />}
              title="DoorDash"
              value="Fast Delivery"
              color="info"
              footer="Top choice in North America."
            />
          </CCol>
        </CRow>
        <CRow>
          {/* GrubHub */}
          <CCol sm={6} lg={3}>
            <CWidgetStatsF
              icon={<CIcon icon={cilUserFollow} height={36} />}
              title="GrubHub"
              value="Local & Fast"
              color="danger"
              footer="Popular in the USA."
            />
          </CCol>
          {/* Postmates */}
          <CCol sm={6} lg={3}>
            <CWidgetStatsF
              icon={<CIcon icon={cilLaptop} height={36} />}
              title="Postmates"
              value="Flexible Deliveries"
              color="secondary"
              footer="Delivers food and essentials."
            />
          </CCol>
          {/* Seamless */}
          <CCol sm={6} lg={3}>
            <CWidgetStatsF
              icon={<CIcon icon={cilBasket} height={36} />}
              title="Seamless"
              value="Food at your Door"
              color="dark"
              footer="Partnered with GrubHub."
            />
          </CCol>
          {/* EatSure */}
          <CCol sm={6} lg={3}>
            <CWidgetStatsF
              icon={<CIcon icon={cilBasket} height={36} />}
              title="EatSure"
              value="100% Hygiene"
              color="light"
              footer="Known for hygienic food delivery."
            />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default Widgets;
