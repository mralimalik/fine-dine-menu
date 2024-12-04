import React from 'react'
import './SwitchButton.css'
const SwitchButton = ({isActive}) => {
  return (
    <div>
          <label className="switch">
            <input type="checkbox" checked={isActive} />
            <span className="slider"></span>
          </label>
    </div>
  )
}

export default SwitchButton
