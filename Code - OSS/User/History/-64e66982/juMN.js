import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          CoreUI
        </a>
        <span className="ms-1">&copy;</span>
      </div>
      <div className="ms-auto">
        <span className="me-1"></span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          TravelHomie
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)