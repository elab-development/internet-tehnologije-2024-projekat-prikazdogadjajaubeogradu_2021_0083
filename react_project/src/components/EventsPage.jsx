import React from 'react'
import Event from '../components/Event';
import axios from 'axios';
import { useState, useEffect } from "react";

function EventsPage() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/events")
      .then((res) => {
        setEvents(res.data.data);
        
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);
  return (
    <div><h3>ALL EVENTS</h3>
    
    {events == null ? (<></>) : (
        events.map((event) => (
          <Event key={event.id} event={event} /> // Spread event data as props
        ))
      )
    }
    </div>
  )
}

export default EventsPage