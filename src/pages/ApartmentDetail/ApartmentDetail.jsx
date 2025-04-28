import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { YMaps } from "react-yandex-maps";
import { useFilters } from "../../context/FilterContext";
import apartments from "../../data/apartments";
import dayjs from "dayjs";
import TopNavigationBar from "./components/TopNavigationBar/TopNavigationBar";
import ApartmentCarousel from "./components/ApartmentCarousel/ApartmentCarousel";
import ApartmentInfoCard from "./components/ApartmentInfoCard/ApartmentInfoCard";
import ApartmentLocationMap from "./components/ApartmentLocationMap/ApartmentLocationMap";
import BookingFooter from "./components/BookingFooter/BookingFooter";
import BookingModal from "./components/BookingModal/BookingModal"; // Новый импорт
import "./ApartmentDetail.css";

function ApartmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedDates } = useFilters();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const apartment = {
    ...apartments.find((apt) => apt.id === Number(id)),
    coordinates: { lat: 51.1694, lng: 71.4491 },
    images: Array(3).fill(""),
  };

  if (!apartment) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        Квартира не найдена
      </h2>
    );
  }

  const rentalDays =
    selectedDates[0] && selectedDates[1]
      ? dayjs(selectedDates[1]).diff(dayjs(selectedDates[0]), "day")
      : 0;

  const handleBook = () => {
    setIsBookingModalOpen(true);
  };

  return (
    <YMaps>
      <div className="apartment-detail-container">
        <TopNavigationBar
          onBack={() => navigate("..")}
          isFavorite={isFavorite}
          toggleFavorite={() => setIsFavorite(!isFavorite)}
        />

        <ApartmentCarousel images={apartment.images} title={apartment.title} />

        <ApartmentInfoCard
          title={apartment.title}
          price={apartment.price}
          rentalDays={rentalDays}
          description={apartment.description}
        />

        <ApartmentLocationMap
          location={apartment.location}
          coordinates={apartment.coordinates}
        />

        <BookingFooter
          price={apartment.price}
          rentalDays={rentalDays}
          onBook={handleBook}
        />

        <BookingModal
          open={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          apartmentPrice={apartment.price}
          rentalDays={rentalDays} // добавили это
          selectedDates={selectedDates}
        />
      </div>
    </YMaps>
  );
}

export default ApartmentDetail;
