import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/EventsPage.css';

function Event({event,token}) {
    let navigate = useNavigate();
  
  const handleReservation = async () => {
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `http://127.0.0.1:8000/api/events/${event.id}/reservations`,
      headers: { 
        'Authorization': 'Bearer '+window.sessionStorage.getItem("auth_token")
      }
    };

    axios.request(config)
    .then((response) => {
      navigate("/events");
      alert("Uspesno ste rezervisali.");
     // console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  };
  
  return (
    <div className="card">

  <div className="card-body" >

    <h5 className="card-title">{event.title}</h5>
    <p className="card-text">{event.location}</p>
    <p className="card-text">{event.date}</p>
    
    <a href="#" className="btn btn-primary event-btn" onClick={handleReservation}>Rezervisi</a>

  </div>
  </div>
  )
}

export default Event