import React from 'react';
import { useState } from 'react';
import '../App.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
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
          addToken(res.data.access_token);
          navigate("/events");
        }
      }).catch((err)=>{
        console.log(err.message);
      });
    }
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h1>Log In</h1>
          <div className="input-group">
            <input type="email" id="email" required onInput={handleInput} name="email"/>
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-group">
            <input type="password" id="password" required onInput={handleInput} name="password"/>
            <label htmlFor="password">Password</label>
          </div>
          <button type="submit" className="login-btn">Log In</button>
          <p className="signup-link">
            Don't have an account? <a href="#">Sign Up</a>
          </p>
        </form>
      </div>
  )
}

export default LoginPage;