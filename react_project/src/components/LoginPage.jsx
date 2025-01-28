import React from 'react';
import { useState } from 'react';
import '../App.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import grb from '../images/grb.png';
import '../style/LoginPage.css';
import Input from './Input.jsx';
import ValidationMessage from './ValidationMessage.jsx';
function LoginPage({addToken}) {
  const [errors, setErrors] = useState({});
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
        //console.log(res.data);
        if(res.data.success===true){
          window.sessionStorage.setItem('auth_token',res.data.access_token);
          window.sessionStorage.setItem('user_type',res.data.user_type);
          
          navigate("/events");
        }
        else{
          const newErrors = {
            password: res.data["0"]?.password?.[0],
            email: res.data["0"]?.email?.[0]
        };
        setErrors(newErrors);
        }
      }).catch((error)=>{
       console.log(error);

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
              <Input
              type="email"
              id="email"
              className="form-input"
              placeholder="Unesite email adresu"
              name="email"
              onInput={handleInput}
              />
              <ValidationMessage message={errors.email} />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Šifra
              </label>
              <Input
              type="password"
              id="password"
              className="form-input"
              placeholder="Unesite lozinku"
              onInput={handleInput}
              name="password"
              />
              <ValidationMessage message={errors.password} />

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