import { useState, useEffect } from 'react';

const useUserType = () => {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const storedUserType = window.sessionStorage.getItem("user_type"); 
    setUserType(storedUserType);
  }, []);

  return userType;
};

export default useUserType