import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/EventsPage.css';
import Button from './Button.jsx';
function Event({event,token}) {
    let navigate = useNavigate();

  const handleReservation = async () => {
    //console.log(window.sessionStorage.getItem("auth_token"));
    

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
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Poruka sa servera:", error.response.data.message); 
          alert(error.response.data.message); 
          return;
        } else if (error.response.status === 500) {
          alert("Došlo je do greške");
        }
      } else {
        console.error("Greška prilikom rezervacije:", error);
        alert("Došlo je greške");
      }
      navigate("/login");
    });
  };
  
  return (
    <div className="card">

  <div className="card-body" >
    <div>
    <h3 className="card-title">{event.title}</h3>
    </div>

      <div className="flex">
      <i className="fas fa-map-marker-alt"></i>
      <p className="card-text">{event.location}</p>
      </div>
    <div className="flex">
    <i className="fa-solid fa-calendar-days"></i>
    <p className="card-text">{event.date}</p>
    </div>
    <div>
    <a>
              <Button 
                className="btn btn-primary event-btn" 
                onClick={() => handleReservation()} 
                iconClass="fas fa-arrow-right sticker-white"
                id="white"
                >
                  Rezerviši
                </Button>
      {/*<button className="btn btn-primary event-btn" onClick={handleReservation}>Rezerviši
      <i className="fas fa-arrow-right sticker-white" id="white"></i>
      </button>*/}
    </a>
    </div>

  </div>
  </div>
  )
}

export default Event