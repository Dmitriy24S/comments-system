import React from 'react'

const IconButton = ({ Icon, isActive, color, children, ...props }) => {
  return (
    <button
      {...props}
      className={['icon-button', isActive ? 'icon-button--active' : ''].join(' ')}
    >
      <span>
        {/* style? children != null ? mr-1 : '' */}
        <Icon />
      </span>
      {children}
    </button>
  )
}

export default IconButton
