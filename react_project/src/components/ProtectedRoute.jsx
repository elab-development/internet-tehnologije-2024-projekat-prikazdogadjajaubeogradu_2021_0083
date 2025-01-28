import React from 'react'
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

const ProtectedRoute = ({ element, userType }) => {
  const storedUserType = sessionStorage.getItem("user_type"); 
  const [alertShown, setAlertShown] = useState(false);  
  if (storedUserType !== userType) {
    if (!alertShown) {
      alert("Nemate dozvolu za pristup ovoj stranici.");
      setAlertShown(true);
    }
    return <Navigate to="/events" replace />;
  }

  return element; 
};

export default ProtectedRoute