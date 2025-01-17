import React from 'react'

function Event({event}) {
  return (
    <div className="card">

  <div className="card-body">
    <h5 className="card-title">{event.title}</h5>
    <p className="card-text">{event.location}</p>
    <p className="card-text">{event.date}</p>
    <a href="#" className="btn btn-primary">Rezervisi</a>
  </div>
</div>
  )
}

export default Event