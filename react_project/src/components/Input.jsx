import React from 'react'

const Input = ({
  type = 'text',
  id,
  className = '',
  placeholder = '',
  name,
  onInput,
  onChange,
  value,
  error
}) => {
  return (
    <div>
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
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input