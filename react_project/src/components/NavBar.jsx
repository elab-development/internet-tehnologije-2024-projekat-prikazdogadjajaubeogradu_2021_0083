import React from 'react';
import axios from 'axios';
import { useNavigate,Outlet } from 'react-router-dom';
function NavBar({token}) {
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
    <nav className="navbar navbar-expand-xl navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="/events">BelEvents</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarWithDropdown" aria-controls="navbarWithDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse show" id="navbarWithDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/events">Events</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/account" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              MyAccount
            </a>
            
              {token == null ? 
              (<ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a className="dropdown-item" href="/login">Log in</a></li>
                 <li><a className="dropdown-item" href="/register">Register</a></li> 
                  </ul> )
                   : 
                  (<ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a className="dropdown-item" href="/events">My reservations</a></li>
                  <li><a className="dropdown-item" href="/events" onClick={handleLogout}>Log out</a></li> 
                  </ul>)
                  }          
           
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <Outlet />
  </div>
  )
}

export default NavBar
