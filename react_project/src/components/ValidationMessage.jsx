import React from 'react'
const ValidationMessage = ({ message }) => {
  if (!message) return null; 
  return (
      <div style={{ color: "red", fontSize: "0.65rem", marginTop: "1px", fontStyle: "italic" }}>
          {message}
      </div>
  );
};

export default ValidationMessage