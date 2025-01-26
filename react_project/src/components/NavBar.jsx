import React from 'react';
import axios from 'axios';
import { useNavigate,Outlet } from 'react-router-dom';
import '../style/NavBar.css';
function NavBar({token}) {
  let navigate = useNavigate();

  function handleLogout(e){
    e.preventDefault();
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
    <div className="page-wrapper">
    <nav className="navbar navbar-expand-xl  ">
    <div className="container-fluid">
      <a className="navbar-brand" href="/events">BelEvents</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarWithDropdown" aria-controls="navbarWithDropdown" aria-expanded="false" aria-label="Toggle navigation">
      {/*<span className="navbar-toggler-icon"></span>*/}
        <i className="fa-solid fa-bars"></i>
      </button>
      <div className="collapse navbar-collapse show" id="navbarWithDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/events">Događaji</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/account" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Moj nalog
            </a>
            
              {window.sessionStorage.getItem("auth_token") == null ? 
              (<ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a className="dropdown-item" href="/login">Uloguj se</a></li>
                 <li><a className="dropdown-item" href="/register">Registruj se</a></li> 
                  </ul> )
                   : 
                  (<ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    {window.sessionStorage.getItem("user_type") == "admin" ? <li><a className="dropdown-item" href="/dashboard">Admin stranica</a></li> : <></>}
                  <li><a className="dropdown-item" href="/reservations">Moje rezervacije</a></li>
                  <li><a className="dropdown-item" href="/login" onClick={handleLogout}>Odjavi se</a></li> 
                  
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
