import React from 'react'
import Event from '../components/Event';
import axios from 'axios';
import { useState, useEffect } from "react";

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
    <div>
    <h3>ALL EVENTS</h3>

      {/* Filter Section */}
      <div className="filter-section">
        <input
          type="text"
          name="title"
          placeholder="Search by title"
          value={filters.title}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Search by location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

    {events.length === 0 ? (
      <p>No events available</p>
    ) : (
      events.map((event) => (
        <Event key={event.id} event={event} token={token} />
      ))
    )}

    {/* Pagination Controls */}
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        &laquo; Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={currentPage === index + 1 ? "active" : ""}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next &raquo;
      </button>
    </div>
  </div>
  )
}

export default EventsPage