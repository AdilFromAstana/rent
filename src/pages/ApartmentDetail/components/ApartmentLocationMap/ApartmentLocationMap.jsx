import { Circle, Map, Placemark } from "react-yandex-maps";

const ApartmentLocationMap = ({ location, coordinates }) => {
  return (
    <div className="map-container">
      <h3>Где вы будете</h3>
      <p>{location}</p>
      <Map
        defaultState={{
          center: [coordinates.lat, coordinates.lng],
          zoom: 14,
        }}
        className="map"
      >
        <Circle
          geometry={[
            [coordinates.lat, coordinates.lng],
            1000, // Радиус 1 км
          ]}
          options={{
            draggable: false,
            fillColor: "rgba(255, 64, 129, 0.2)",
            strokeColor: "#ff4081",
            strokeOpacity: 0.5,
            strokeWidth: 2,
          }}
        />
        <Placemark
          geometry={[coordinates.lat, coordinates.lng]}
          options={{
            preset: "islands#redHomeIcon",
          }}
        />
      </Map>
    </div>
  );
};

export default ApartmentLocationMap;
