import React from 'react';
import { useState } from 'react';
import '../App.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import grb from '../images/grb.png';
import '../style/LoginPage.css';
function LoginPage({addToken}) {
    const [userData, setUserData] = useState({
      email:"",
      password:"",
    })
    function handleInput(e){

      let newUserData = userData;
      newUserData[e.target.name]=e.target.value;
      setUserData(newUserData);

    }
    let navigate = useNavigate();

    function handleLogin(e){
      e.preventDefault();
      axios.post('http://127.0.0.1:8000/api/login',userData).then((res)=>{
        console.log(res.data);
        if(res.data.success===true){
          window.sessionStorage.setItem('auth_token',res.data.access_token);
          window.sessionStorage.setItem('user_type',res.data.user_type);
          
          navigate("/events");
        }
      }).catch((err)=>{
        console.log(err.message);
      });
    }
    return (
      <div className="login-card">
        <div className="login-image-wrapper">
          <h1>BelEvents</h1>
          <img src={grb} alt="Login" className="login-image" />
        </div>
        <div className="login-form-wrapper">
          <form className="login-form" onSubmit={handleLogin}>
            <h1 className="login-title">Dobrodošli</h1>
            <p className="login-subtitle">Ulogujte se na Vaš nalog</p>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email adresa
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Unesite email adresu"
                onInput={handleInput}
                name="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Šifra
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Unesite lozinku"
                onInput={handleInput} name="password"
              />
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <p className="login-footer">
            Nemate nalog? <a href="/register">Registrujte se</a>
          </p>
        </div>
      </div>
  )
}

export default LoginPage;