import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
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
