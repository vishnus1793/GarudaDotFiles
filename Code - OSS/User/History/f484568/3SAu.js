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
  
  
  
  

]

export default _nav
