import { useEffect, useState } from "react";
import { Polyline } from "react-leaflet";
import polyline from "@mapbox/polyline";

const RouteLine = ({ from, to, onRouteData }) => {
  const [routeCoords, setRouteCoords] = useState([]);

  useEffect(() => {
    if (!from || !to) return;

    const fetchRoute = async () => {
      const url = "http://localhost:8000/api/route"; 

      const body = {
        coordinates: [
          [from[1], from[0]],
          [to[1], to[0]],
        ],
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          console.error("HTTP error:", response.status, response.statusText);
          return;
        }

        const data = await response.json();

        if (
          data &&
          data.routes &&
          data.routes.length > 0 &&
          data.routes[0].geometry
        ) {
          // Dekodiranje koordinata polilajna
          const decoded = polyline.decode(data.routes[0].geometry);
          setRouteCoords(decoded);

          if (onRouteData) {
            onRouteData({
              distance: data.routes[0].summary.distance,
              duration: data.routes[0].summary.duration,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    fetchRoute();
  }, [from, to]);

  if (!routeCoords.length) return null;

  return <Polyline positions={routeCoords} color="blue" />;
};

export default RouteLine;
