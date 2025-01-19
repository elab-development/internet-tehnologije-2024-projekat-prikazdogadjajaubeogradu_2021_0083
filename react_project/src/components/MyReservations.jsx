import React from 'react'
import axios from 'axios'
import { useState, useEffect } from "react";

function MyReservations({token}) {

    const [reservations, setReservations] = useState([]);

    useEffect(() => {
      const fetchReservations = async () => {
        if (!window.sessionStorage.getItem("auth_token")) {
          alert('You need to log in to view your reservations.');
          return;
        }
  
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/reservations', {
            headers: {
              Authorization: `Bearer ${window.sessionStorage.getItem("auth_token")}`, // Add the Bearer token to the request
            },
          });
  
          setReservations(response.data); // Set the fetched reservations
        } catch (error) {
          console.error('Error fetching reservations:', error.response || error.message || error);
          alert('Failed to fetch reservations. Please try again.');
        }
      };
  
      fetchReservations();
    }, []); 

    const handleDelete = async (userId, eventId) => {

        console.log("Moj token:", window.sessionStorage.getItem("auth_token")); 
        try {
          
          await axios.delete(`http://127.0.0.1:8000/api/reservations/${userId}/${eventId}`, {
            headers: {
              Authorization: `Bearer ${window.sessionStorage.getItem("auth_token")}`,
            },
          });
          
          setReservations((prevReservations) =>
            prevReservations.filter(
              (reservation) => reservation.id_user !== userId || reservation.id_event !== eventId
            )
          );
          alert('Reservation deleted successfully.');
        } catch (error) {
          console.error('Error deleting reservation:', error);
          alert('Failed to delete reservation.');
        }
      };
  
    return (
      <div>
        <h2>My Reservations</h2>
        <div className="reservation-list">
          {reservations.length > 0 ? (
            reservations.map((reservation, index) => (
              <div key={index} className="reservation-card">
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
          ) : (
            <p>No reservations found.</p>
          )}
        </div>
      </div>
    );
}

export default MyReservations