import React from 'react'
import axios from 'axios';
import { useState, useEffect } from "react";
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
  <div>
  <div>
    <h1>Admin Dashboard</h1>
  </div>
  {isLoading ? ( 
    <p>Loading users...</p> 
  ) : (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">User Type</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users
          .filter(user => user.user_type === "user") 
          .map((user) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.user_type}</td>
              <td>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={() => handleDelete(user)}>
                  Delete User
                </button>
              </td>
              <td>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={() => handleReservations(user.id)}>
                  Reservations
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )}

    <h2>User Reservations</h2>
      {isLoadingReservations ? (
        <p>Loading reservations...</p>
      ) : filteredReservations.length === 0 ? (
        <p>No reservations for the selected user.</p>
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
              <p>Location: {reservation.event.location}</p>
              <p>Date: {reservation.event.date}</p>
              <button
                onClick={() =>
                  handleDeleteReservation(
                    reservation.id_user,
                    reservation.id_event
                  )
                }
                className="btn btn-danger"
              >
                DELETE
              </button>
            </div>
          ))}
        </div>
      )}
</div>
  )
}

export default AdminDashboard