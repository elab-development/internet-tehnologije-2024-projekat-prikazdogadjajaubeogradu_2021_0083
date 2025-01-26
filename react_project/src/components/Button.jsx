import React from 'react'

const Button = ({type = 'button', onClick, className = '', iconClass, children, id}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className}`}
    >
      {children && <span>{children}</span>}
      {iconClass && <i className={iconClass} id={id}></i>}
    </button>
  );
};

export default Button