import React from 'react'
import Event from '../components/Event';
import axios from 'axios';
import { useState, useEffect } from "react";
import '../style/EventsPage.css';
import Input from './Input.jsx';
function EventsPage({token}) {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [filters, setFilters] = useState({ title: "", location: "" });

  useEffect(() => {
    fetchEvents(currentPage); 
  }, [currentPage]);

  const fetchEvents = (/*page*/) => {

    const params = {
      page: currentPage,
      ...(filters.title && { title: filters.title }),
      ...(filters.location && { location: filters.location }),
    };

    axios
      .get(`http://127.0.0.1:8000/api/filter`,{params})
      .then((res) => {
       // console.log(res.data); 
        setEvents(res.data.data); 
        setTotalPages(res.data.last_page); 
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    setCurrentPage(1); 
    fetchEvents();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); 
  };


  return (
    <div className="events">
      <div className="header">

      <h1>Dostupni dogadjaji</h1>
      <div className="filter-section-events">
      <Input
              type="text"
              className="form-control"
              placeholder="Naziv"
              name="title"
              onChange={handleFilterChange}
              value={filters.title}
              />
  <Input
              type="text"
              className="form-control"
              placeholder="Lokacija"
              name="location"
              onChange={handleFilterChange}
              value={filters.location}
              />
        <button className=" search-btn" onClick={handleSearch}>Pretraži
        <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      </div>
    <div className="cards">
    {events.length === 0 ? (
      <p>No events available</p>
    ) : (
      
      events.map((event) => (
        <Event key={event.id} event={event} token={token} />
      
      ))
    )}
  </div>
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="btn btn-light "
      >
        &laquo; Previous
      </button>
      <div className="pagionation-buttons">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={currentPage === index + 1 ? "active btn btn-light hide" : "btn btn-light hide"}
          
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
        
      ))}
      </div>
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)
        }
        className="btn btn-light "
      >
        Next &raquo;
      </button>
    </div>
  </div>
  )
}

export default EventsPage