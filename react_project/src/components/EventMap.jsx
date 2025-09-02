import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
  Circle,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import homeIcon from "../images/home.png";
import destinationIcon from "../images/placeholder.png";
import { useEffect, useState } from "react";
import RouteLine from "./RouteLine";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const homeIconMark = new L.Icon({
  iconUrl: homeIcon,
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});
const destinationIconMark = new L.Icon({
  iconUrl: destinationIcon,
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const { BaseLayer, Overlay } = LayersControl;

const EventMap = ({ lat, lng, onRouteData }) => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation([position.coords.latitude, position.coords.longitude]);
    });
  }, []);
  const from = userLocation || [lat, lng];
  const to = [lat, lng];
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      style={{ height: "250px", width: "100%", borderRadius: "10px" }}
    >
      <LayersControl position="topright">
        <BaseLayer checked name="Standarda mapa">
          <TileLayer
            attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </BaseLayer>

        <BaseLayer name="Topografska mapa">
          <TileLayer
            attribution="Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)"
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          />
        </BaseLayer>

        <BaseLayer name="Minimalistička mapa">
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CartoDB</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
        </BaseLayer>

        <Overlay name="Lokacija događaja" checked>
          <Marker position={[lat, lng]} icon={destinationIconMark}>
            <Popup>Lokacija događaja</Popup>
          </Marker>
        </Overlay>

        <Overlay name="Okolina">
          <LayerGroup>
            <Circle
              center={[lat, lng]}
              radius={500}
              pathOptions={{
                color: "blue",
                fillColor: "blue",
                fillOpacity: 0.2,
              }}
            />
          </LayerGroup>
        </Overlay>

        <Overlay name="Moja lokacija" checked>
          <LayerGroup>
            {userLocation && (
              <>
                <Marker position={userLocation} icon={homeIconMark}>
                  <Popup>Moja lokacija</Popup>
                </Marker>
              </>
            )}
          </LayerGroup>
        </Overlay>
      </LayersControl>

      <RouteLine from={from} to={to} onRouteData={onRouteData} />
    </MapContainer>
  );
};

export default EventMap;
