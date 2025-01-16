import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function NavBar() {
  let navigate = useNavigate();

  function handleLogout(e){
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/api/logout',
      headers: { 
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token"),
      }
    };
    axios.request(config)
    .then((response) => {
      if(response.data.success===true){
        navigate("/login");
        }
      console.log(JSON.stringify(response.data));
      window.sessionStorage.setItem("auth_token", null);
      
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div>
      <a href="#" onClick={handleLogout}>Log Out
      </a>
    </div>
  )
}

export default NavBar
