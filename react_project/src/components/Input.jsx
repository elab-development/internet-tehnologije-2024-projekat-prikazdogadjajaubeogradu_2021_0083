import React from 'react'

const Input = ({
  type = 'text',
  id,
  className = '',
  placeholder = '',
  name,
  onInput,
  onChange,
  value
}) => {
  return (
    <input
      type={type}
      id={id}
      className={`form-input ${className}`}
      placeholder={placeholder}
      name={name}
      onInput={onInput}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input