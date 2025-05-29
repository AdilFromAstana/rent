import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LocationMap = ({ coords }) => (
  <MapContainer
    center={coords}
    zoom={14}
    style={{
      height: "300px",
      width: "100%",
      borderRadius: "12px",
      marginTop: 16,
    }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    />
    <Marker
      position={coords}
      icon={L.divIcon({
        className: "price-marker",
        html: `Тут`,
      })}
    />
  </MapContainer>
);

export default LocationMap;
