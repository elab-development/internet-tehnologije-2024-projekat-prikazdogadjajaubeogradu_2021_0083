import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/EventsPage.css";
import Button from "./Button.jsx";
import ReservationModal from "./ReservationModal.jsx";
function Event({ event, token }) {
  let navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const handleReservation = async () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://127.0.0.1:8000/api/events/${event.id}/reservations`,
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("auth_token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        navigate("/events");
        alert("Uspesno ste rezervisali.");
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            console.log("Poruka sa servera:", error.response.data.message);
            alert(error.response.data.message);
            return;
          } else if (error.response.status === 500) {
            alert("Došlo je do greške");
          }
        } else {
          console.error("Greška prilikom rezervacije:", error);
          alert("Došlo je greške");
        }
        navigate("/login");
      });
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="card">
      <div className="card-body">
        <div style={{ height: "30%" }}>
          <h3 className="card-title">{event.title}</h3>
        </div>

        <div className="flex">
          <i className="fas fa-map-marker-alt"></i>
          <p className="card-text">{event.location}</p>
        </div>
        <div className="flex">
          <i className="fa-solid fa-calendar-days"></i>
          <p className="card-text">{event.date}</p>
        </div>
        <div>
          <a>
            <Button
              className="btn btn-primary event-btn"
              onClick={() => setModalOpen(true)}
              iconClass="fas fa-arrow-right sticker-white"
              id="white"
            >
              Rezerviši
            </Button>
          </a>
        </div>
      </div>
      <ReservationModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        event={event}
        onConfirm={handleReservation}
      />
    </div>
  );
}

export default Event;
