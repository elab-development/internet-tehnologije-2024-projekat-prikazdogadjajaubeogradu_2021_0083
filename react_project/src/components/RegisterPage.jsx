import React from 'react'
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
const [userData, setUserData] = useState({
      name:"",
      email:"",
      password:"",
    })

    function handleRegister(e){
      e.preventDefault();
      axios.post('http://127.0.0.1:8000/api/register',userData).then((res)=>{
        console.log(res.data);
        if(res.data.success===true){
        navigate("/login");
        }
      }).catch((err)=>{
        console.log(err.message);
      });
    }
    let navigate = useNavigate();
  function handleInput(e){
    let newUserData = userData;
    newUserData[e.target.name]=e.target.value;
    setUserData(newUserData);
   // console.log(userData);
  }


  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
      <h1>Register</h1>
      <div className="input-group">
        <input type="text" id="name" required name="name" onInput={handleInput}/>
        <label htmlFor="name">Full Name</label>
      </div>
      <div className="input-group">
        <input type="email" id="email" required name="email" onInput={handleInput}/>
        <label htmlFor="email">Email</label>
      </div>
      <div className="input-group">
        <input type="password" id="password" required name="password" onInput={handleInput}/>
        <label htmlFor="password">Password</label>
      </div>
      <div className="input-group">
        <input type="password" id="confirm-password" required name="confirmPassword" onInput={handleInput}/>
        <label htmlFor="confirm-password">Confirm Password</label>
      </div>
      <button type="submit" className="register-btn" >Register</button>
      <p className="login-link">
        Already have an account? <a href="#">Log In</a>
      </p>
      </form>
    </div>
  )
}

export default RegisterPage