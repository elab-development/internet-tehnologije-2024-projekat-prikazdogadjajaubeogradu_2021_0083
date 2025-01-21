import React from 'react'
import axios from 'axios';
import { useState, useEffect } from "react";
function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

    const handleDelete = (deletedUser) => {
      
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

  return (
    <div>
      <div>
        <h1>Admin dashboard</h1>
      </div>
      {isLoading? ( <p>Korisnici se ucitavaju</p> ) : (<table className="table">
      <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Ime i prezime</th>
      <th scope="col">Email</th>
      <th scope="col">Tip korisnika</th>
      <th></th>
    </tr>
  </thead>
    {isLoading  ?  ( <p>Korisnici se ucitavaju</p> )
      :(
        users.map((user) => (
          <tbody key={user.id}>
    <tr>
      <th scope="row">{user.id}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.user_type}</td>
      <td><button type="button" className="btn btn-primary" onClick={() => handleDelete(user)}>Obrisi korisnika</button></td>
    </tr>
    </tbody>
        ))
      )}


      </table>)}
      
      
  </div>
  )
}

export default AdminDashboard