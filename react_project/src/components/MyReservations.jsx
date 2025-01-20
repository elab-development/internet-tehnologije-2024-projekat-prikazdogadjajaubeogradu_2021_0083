import React from 'react'
import axios from 'axios'
import { useState, useEffect } from "react";

function MyReservations({token}) {

    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      const fetchReservations = async () => {
        if (!window.sessionStorage.getItem("auth_token")) {
          alert('You need to log in to view your reservations.');
          return;
        }
  
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/reservations', {
            headers: {
              Authorization: `Bearer ${window.sessionStorage.getItem("auth_token")}`, 
            },
          });
  
          setReservations(response.data); 
        } catch (error) {
          console.error('Error fetching reservations:', error.response || error.message || error);
          alert('Failed to fetch reservations. Please try again.');
        }finally {
          setIsLoading(false); 
        }
      };
  
      fetchReservations();
    }, []); 

    const handleDownload = () => {

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:8000/api/export',
        headers: { 
          'Authorization': 'Bearer '+window.sessionStorage.getItem("auth_token")
        },
       responseType: 'blob'
      };
      
      axios.request(config)
      .then((response) => {
        console.log("Kreiranje url-a");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'rezervacije.pdf'); 
      document.body.appendChild(link);
      link.click();
      link.remove();
      })
      .catch((error) => {
        console.log(error);
      });
    }

    const handleDelete = async (userId, eventId) => {

       // console.log("Moj token:", window.sessionStorage.getItem("auth_token")); 
       // console.log("User id:", userId);
       // console.log("Event id:", eventId);
        let config = {
          method: 'delete',
          maxBodyLength: Infinity,
          url: `http://127.0.0.1:8000/api/reservations/${userId}/${eventId}`,
          headers: { 
            'Authorization': 'Bearer '+window.sessionStorage.getItem("auth_token")
          }
        };
        
        axios.request(config)
        .then((response) => {
          console.log("Uspesno obrisano. " + JSON.stringify(response.data));
          setReservations(reservations.filter(reservation => 
            reservation.id_user !== userId || reservation.id_event !== eventId
          ));
        })
        .catch((error) => {
          console.log(error);
        });
      };
  
    return (
      <div>
        <h2>My Reservations</h2>
        <button onClick={handleDownload} className="btn btn-primary">
      Skini rezervacije u PDF-u
    </button>
        <div className="reservation-list">
          {isLoading  ?  ( <p>Rezervacije se ucitavaju</p> )
          : reservations.length === 0 ? (
            <p>Nemate rezervacija.</p> 
          ):(
            reservations.map((reservation, index) => (
              <div key={index} className="reservation-card" style={{ border: "1px solid black",margin: "2rem", padding:"2rem"}}>
                <h5>{reservation.event.title}</h5>
                <p>Location: {reservation.event.location}</p>
                <p>Date: {reservation.event.date}</p>
                <button
                onClick={() => handleDelete(reservation.id_user, reservation.id_event)}
                className="btn btn-danger">
                DELETE
              </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
}

export default MyReservations