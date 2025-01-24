import React from 'react'
import axios from 'axios'
import { useState, useEffect } from "react";
import '../style/Reservations.css'

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
      <div className="reservations-wrapper">
        <button onClick={handleDownload} className="btn admin-show">
      Skini rezervacije u PDF-u
    </button>
    {isLoading  ?  ( <p>Rezervacije se ucitavaju</p> )
          : reservations.length === 0 ? (
            <p>Nemate rezervacija.</p> 
          ):(
      <table className="table">
  <thead>
    <tr>
      <th scope="col">Naziv dogadjaja</th>
      <th scope="col">Datum</th>
      <th scope="col">Lokacija</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
  {reservations.map((reservation) => (
        <tr key={reservation.event.id}>
            <td>{reservation.event.title}</td>
            <td>{reservation.event.date}</td>
            <td>{reservation.event.location}</td>
            <td><button type='button' className="btn admin-delete" onClick={handleDelete}>Obriši</button></td>
        </tr>
    ))}
  </tbody>
</table>
          )}
</div>
    );
}

export default MyReservations