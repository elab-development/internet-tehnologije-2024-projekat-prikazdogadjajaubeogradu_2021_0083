import './App.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useState } from "react";
import EventsPage from './components/EventsPage';
import MyReservations from './components/MyReservations';
import AdminDashboard  from './components/AdminDashboard';
function App() {
  const [token,setToken]=useState();
  function addToken(auth_token){
    setToken(auth_token);
  }

  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path="/login" element={<LoginPage addToken={addToken}/>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<NavBar token={token}/>}>
        <Route path="/" element={<EventsPage token={token} />} />
        <Route path="events" element={<EventsPage token={token} />} />
        <Route path="reservations" element={<MyReservations token={token} />} />
        <Route path="dashboard"  element={<AdminDashboard/>}/>
      </Route>
      </Routes>
    </div>
    </BrowserRouter>


  );
}

export default App;
