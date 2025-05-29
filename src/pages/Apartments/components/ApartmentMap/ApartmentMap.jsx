import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useFilters } from "../../../../context/FilterContext";
import dayjs from "dayjs";

const center = {
  almaty: [43.238949, 76.889709],
  astana: [51.1605, 71.4704],
};

const ApartmentMap = ({
  apartments,
  selectedApartment,
  onSelect,
  onNavigate,
}) => {
  const { city, selectedDates } = useFilters();

  const nights =
    selectedDates?.[0] && selectedDates?.[1]
      ? dayjs(selectedDates[1]).diff(dayjs(selectedDates[0]), "day")
      : 0;

  const totalPrice = nights * selectedApartment?.price;

  return (
    <MapContainer
      center={center[city]}
      zoom={14}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {apartments.map((apt) => (
        <Marker
          key={apt.id}
          position={apt.coords}
          icon={L.divIcon({
            className: "price-marker",
            html: `₸${apt.price.toLocaleString()}`,
          })}
          eventHandlers={{
            click: () => onSelect(apt),
          }}
        />
      ))}

      {selectedApartment && (
        <Popup
          position={selectedApartment.coords}
          onClose={() => onSelect(null)}
        >
          <div className="popup-card">
            <img
              src={selectedApartment.images[0]}
              alt={selectedApartment.title}
            />
            <div className="info">
              <h4
                onClick={() => onNavigate(`/apartment/${selectedApartment.id}`)}
                style={{ cursor: "pointer" }}
              >
                {selectedApartment.title}
              </h4>
              <p>{selectedApartment.description}</p>
              <div className="prices">
                <div className="price-info">
                  <strong>
                    ₸{selectedApartment.price.toLocaleString()} / ночь
                  </strong>
                </div>
                {nights > 0 && (
                  <div className="total-price">
                    Всего за {nights} ночей:{" "}
                    <b>₸{totalPrice.toLocaleString()}</b>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Popup>
      )}
    </MapContainer>
  );
};

export default ApartmentMap;
