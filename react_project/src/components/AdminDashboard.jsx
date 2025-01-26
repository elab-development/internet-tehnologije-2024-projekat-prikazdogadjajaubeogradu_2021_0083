import React from 'react'
import axios from 'axios';
import { useState, useEffect } from "react";
import '../style/Dashboard.css'

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [isLoadingReservations, setIsLoadingReservations] = useState(false);

    const handleDelete = (deletedUser) => {
      const confirmDelete = window.confirm(`Are you sure you want to delete the user ${deletedUser.name}?`);
    
      if (!confirmDelete) {
        return; 
      }
  

      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `http://127.0.0.1:8000/api/users/${deletedUser.id}`,
        headers: { 
          'Authorization': `Bearer ${window.sessionStorage.getItem("auth_token")}`
        }
      };
      
      axios.request(config)
      .then((response) => {
        setUsers(users.filter(user => 
            user.id !== deletedUser.id 
        ));
        console.log("Uspesno se izbrisali datog korisnika.")
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

    }


    const handleUsers = ()=>{

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:8000/api/users',
        headers: { 
          'Authorization': `Bearer ${window.sessionStorage.getItem("auth_token")}`
        }
      };
      
      axios.request(config)
      .then((response) => {
        setUsers(response.data.data);
       // console.log("Response data:", response.data.data);
      }).catch((error) => { 
      console.log("Error:", error);
      alert("Error:", error);
      })
      .finally(() => {
        setIsLoading(false); 
      });

    };

    useEffect(() => {
      handleUsers();
    }, []);

    const handleReservations = async (userId) => {
      setIsLoadingReservations(true);
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/reservations",
          {
            headers: {
              Authorization: `Bearer ${window.sessionStorage.getItem(
                "auth_token"
              )}`,
            },
          }
        );
  
        const userReservations = response.data.filter(
          (reservation) => reservation.id_user === userId
        );
  
        setFilteredReservations(userReservations);
      } catch (error) {
        console.error("Error fetching reservations:", error.response || error);
        alert("Failed to fetch reservations. Please try again.");
      } finally {
        setIsLoadingReservations(false);
      }
    };

    const handleDeleteReservation = async (userId, eventId) => {
      if (!window.confirm("Are you sure you want to delete this reservation?")) {
        return;
      }
  
      try {
        await axios.delete(
          `http://127.0.0.1:8000/api/reservations/${userId}/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${window.sessionStorage.getItem(
                "auth_token"
              )}`,
            },
          }
        );

        setFilteredReservations((prevReservations) =>
          prevReservations.filter(
            (reservation) =>
              reservation.id_user !== userId || reservation.id_event !== eventId
          )
        );
  
        alert("Reservation deleted successfully.");
      } catch (error) {
        console.error("Error deleting reservation:", error.response || error);
        alert("Failed to delete the reservation. Please try again.");
      }
    };

  return (
  <div className="dashboard-wrapper">
  <div>
    <h1>Admin stranica</h1>
  </div>
  {isLoading ? ( 
    <p>Učitavanje korisnika</p> 
  ) : (
    <table className="table">
      <thead>
        <tr>
          <th id="th_hide" scope="col">ID</th>
          <th id="th" scope="col">Ime</th>
          <th id="th" scope="col">Email adresa</th>
          <th id="th_hide" scope="col">Tip korisnika</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users
          .filter(user => user.user_type === "user") 
          .map((user) => (
            <tr key={user.id}>
              <th id="th_hide" scope="row">{user.id}</th>
              <td id="td">{user.name}</td>
              <td id="td">{user.email}</td>
              <td id="td_hide">{user.user_type}</td>
              <td id="td">
                <button 
                  type="button" 
                  className="btn admin-delete" 
                  onClick={() => handleDelete(user)}>
                  <span>Obriši korisnika</span>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
              <td id="td">
                <button 
                  type="button" 
                  className="btn admin-show" 
                  onClick={() => handleReservations(user.id)}>
                  <span>Rezervacije</span>
                  <i className="fa-solid fa-list"></i>
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )}

    <h2>Rezervacije</h2>
      {isLoadingReservations ? (
        <p>Rezervacije se učitavaju...</p>
      ) : filteredReservations.length === 0 ? (
        <p>Nema rezervacija za izabranog korisnika.</p>
      ) : (
        <div className="reservation-list">
          {filteredReservations.map((reservation, index) => (
            <div
              key={index}
              className="reservation-card"
              style={{
                border: "1px solid black",
                margin: "2rem",
                padding: "2rem",
              }}
            >
              <h5>{reservation.event.title}</h5>
              <div>
              <i className="fas fa-map-marker-alt"></i>
              <p>Lokacija: {reservation.event.location}</p>
              </div>
              <div>
              <i className="fa-solid fa-calendar-days"></i>
              <p>Datum: {reservation.event.date}</p>
              </div>
              <button
                onClick={() =>
                  handleDeleteReservation(
                    reservation.id_user,
                    reservation.id_event
                  )
                }
                className="btn btn-danger res-delete"
              >
                <span>Obriši rezervaciju</span>
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          ))}
        </div>
      )}
</div>
  )
}

export default AdminDashboard