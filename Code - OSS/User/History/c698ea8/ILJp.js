import React, { useEffect, useState, createRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'
import './Colors.css';


const ThemeView = () => {
  const [color, setColor] = useState('rgb(255, 255, 255)')
  const ref = createRef()

  useEffect(() => {
    const el = ref.current.parentNode.firstChild
    const varColor = window.getComputedStyle(el).getPropertyValue('background-color')
    setColor(varColor)
  }, [ref])

  return (
    <table className="table w-100" ref={ref}>
      <tbody>
        <tr>
          <td className="text-body-secondary">HEX:</td>
          <td className="font-weight-bold">{rgbToHex(color)}</td>
        </tr>
        <tr>
          <td className="text-body-secondary">RGB:</td>
          <td className="font-weight-bold">{color}</td>
        </tr>
      </tbody>
    </table>
  )
}

const ThemeColor = ({ className, children }) => {
  const classes = classNames(className, 'theme-color w-75 rounded mb-3')
  return (
    <CCol xs={12} sm={6} md={4} xl={2} className="mb-4">
      <div className={classes} style={{ paddingTop: '75%' }}></div>
      {children}
      <ThemeView />
    </CCol>
  )
}

ThemeColor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

const PNR = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <h3>Passenger Name Record</h3>
          
          <input className="c-checkbox" type="checkbox" id="checkbox" />
          <div className="c-formContainer">
            <form className="c-form" action="">
              <input 
                 className="c-form__input" 
                 placeholder="Enter Number" 
                 type="number" 
                 required 
              />
              <label className="c-form__buttonLabel" htmlFor="checkbox">
                <button className="c-form__button" type="button">Send</button>
              </label>
              <label className="c-form__toggle" htmlFor="checkbox" data-title="Click Here"></label>
            </form>
          </div>
        </CCardHeader>
      </CCard>
    </>
  )
}

export default PNR
