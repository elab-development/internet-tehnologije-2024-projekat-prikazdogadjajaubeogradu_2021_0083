import { useEffect, useState } from "react";
import Modal from "react-modal";
import "../style/ReservationModal.css";
import EventMap from "./EventMap";
const ReservationModal = ({ isOpen, onRequestClose, event, onConfirm }) => {
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);
  useEffect(() => {
    if (!coords || !event.date) return;
    //javni servis za vracanje vremenske prognoze
    const fetchWeather = async () => {
      try {
        const match = event.date.match(/^(\d{2})\.(\d{2})\.(\d{4})\.$/);
        if (!match) {
          console.log("Datum nije u očekivanom formatu.");
          return;
        }
        const [_, day, month, year] = match;
        const formattedDate = `${year}-${month}-${day}`;

        const apiKey = "3fd115e7d8bb40a7b42173849252207";
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${coords.lat},${coords.lng}&dt=${formattedDate}`;

        const response = await fetch(url);
        if (!response.ok) {
          console.error("Greška u pozivu WeatherAPI:", response.statusText);
          return;
        }
        const data = await response.json();

        // Podaci su u data.forecast.forecastday[0]
        if (
          data &&
          data.forecast &&
          data.forecast.forecastday &&
          data.forecast.forecastday.length > 0
        ) {
          const dayForecast = data.forecast.forecastday[0].day;
          setWeather({
            temp_max: dayForecast.maxtemp_c,
            temp_min: dayForecast.mintemp_c,
            precipitation: dayForecast.totalprecip_mm,
            condition: dayForecast.condition.text,
            icon: dayForecast.condition.icon,
          });
        } else {
          console.warn("Nema dostupnih vremenskih podataka za izabrani datum.");
        }
      } catch (error) {
        console.error("Greška pri dohvatu vremenske prognoze:", error);
      }
    };

    fetchWeather();
  }, [coords, event.date]);
  useEffect(() => {
    if (!isOpen) return;
    const cleanLocation = (location) => {
      if (!location) return "";
      const splitIndex = location.search(/[-\/]/);
      if (splitIndex === -1) return location.trim();
      return location.substring(0, splitIndex).trim();
    };

    //javni servis za dekodiranje koordinata na osnovu naziva lokacije
    const fetchCoords = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            cleanLocation(event.location)
          )}`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          setCoords({
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          });
        } else {
          setCoords(null);
        }
      } catch (error) {
        console.error("Greška prilikom geokodiranja:", error);
        setCoords(null);
      }
    };

    fetchCoords();
  }, [isOpen, event.location]);
  const [routeInfo, setRouteInfo] = useState(null);
  if (!event) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Potvrda rezervacije"
      className="ReservationModal"
    >
      <div>
        <h3 className="card-title">{event.title}</h3>
      </div>

      <div className="flex-res">
        <i className="fas fa-map-marker-alt"></i>
        <p className="card-text">{event.location}</p>
      </div>
      <div className="flex-res">
        <i className="fa-solid fa-calendar-days"></i>
        <p className="card-text">{event.date}</p>
      </div>
      {coords ? (
        <EventMap
          lat={coords.lat}
          lng={coords.lng}
          onRouteData={setRouteInfo}
        />
      ) : (
        <p style={{ color: "#666", fontStyle: "italic" }}>
          Učitavanje mape ili adresa nije pronađena.
        </p>
      )}
      {routeInfo && (
        <div className="route-info">
          <p>Dužina rute: {(routeInfo.distance / 1000).toFixed(2)} km</p>
          <p>Trajanje: {Math.round(routeInfo.duration / 60)} min</p>
        </div>
      )}
      {weather && (
        <div className="weather-info">
          <p>
            <img
              src={weather.icon}
              alt={weather.condition}
              style={{ verticalAlign: "middle" }}
            />{" "}
            {weather.condition}
          </p>
          <p>
            Temperatura: max {weather.temp_max}°C, min {weather.temp_min}°C
          </p>
          <p>Padavine: {weather.precipitation} mm</p>
        </div>
      )}
      <div className="modal-buttons">
        <button
          onClick={onConfirm}
          className="btn btn-success"
          style={{ marginRight: "10px" }}
        >
          Potvrdi rezervaciju
        </button>
        <button onClick={onRequestClose} className="btn btn-secondary">
          Otkaži
        </button>
      </div>
    </Modal>
  );
};

export default ReservationModal;
