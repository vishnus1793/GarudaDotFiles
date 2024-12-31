import React from 'react';
import CIcon from '@coreui/icons-react';


import { cilFastfood } from '@coreui/icons'



import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilClock,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Train',
  },
  {
    component: CNavItem,
    name: 'PNR',
    to: '/theme/colors',
    icon: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '25px', // Set width for the circle
          height: '25px', // Set height for the circle
          borderRadius: '50%', // Make it circular
          border: '2px solid #007bff', // Border color
          color: '#007bff', // Text color
          fontWeight: 'bold', // Text styling
          fontSize:'10px',
          textAlign: 'center',
          marginRight: '10px', // Space between icon and name
        }}
      >
        PNR
      </div>
    ),
  },
  {
    component: CNavItem,
    name: 'Order Food',
    to: '/widgets',
    icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />
    
  },
  {
    component: CNavItem,
    name: 'TravelGPT',
    to: '/docs', // Use an internal route instead
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,

},  
{
  component: CNavItem,
  name: 'ChatGpt',
  to: '/404',
  <CIcon icon={cilSpeech} size="lg" />
},
  {
    component: CNavItem,
    name: 'Train Status',
    to: '/theme/typography',
    icon: <CIcon icon={cilClock} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Login',
    to: '/login',
  },
  {
    component: CNavItem,
    name: 'New Entry',
    to: '/register',
  },
 
  

]

export default _nav
