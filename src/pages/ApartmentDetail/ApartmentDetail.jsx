import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Row, Col, Divider } from "antd";
import apartments from "../../data/apartments";
import "./ApartmentDetail.scss";
import ApartmentGallery from "./components/ApartmentGallery/ApartmentGallery";
import ApartmentHeader from "./components/ApartmentHeader/ApartmentHeader";
import LocationMap from "./components/LocationMap/LocationMap";
import AmenitiesList from "./components/AmenitiesList/AmenitiesList";
import HostInfo from "./components/HostInfo/HostInfo";
import ReviewsList from "./components/ReviewsList/ReviewsList";
import BookingCard from "./components/BookingCard/BookingCard";
import FaceVerificationModal from "./components/FaceVerificationModal/FaceVerificationModal";

const ApartmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apartment = apartments.find((apt) => apt.id === Number(id));
  const [showModal, setShowModal] = useState(false);

  const handleBooking = () => {
    setShowModal(true);
  };

  if (!apartment) return <div style={{ padding: 32 }}>Квартира не найдена</div>;

  return (
    <div className="apartment-details">
      <Button onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
        ← Назад
      </Button>

      <Row gutter={[32, 32]}>
        <Col xs={24} md={14}>
          <ApartmentGallery images={apartment.images} />

          <ApartmentHeader
            title={apartment.title}
            price={apartment.price}
            location={apartment.location}
          />

          {apartment.coords && (
            <>
              <Divider orientation="left">Расположение</Divider>
              <LocationMap coords={apartment.coords} />
            </>
          )}

          <Divider orientation="left">Удобства</Divider>
          <AmenitiesList />

          <Divider orientation="left">О хозяине</Divider>
          <HostInfo />

          <Divider orientation="left">Отзывы</Divider>
          <ReviewsList />
        </Col>

        <Col xs={24} md={10}>
          <BookingCard
            price={apartment.price}
            onBooking={handleBooking}
            bookedDates={apartment.bookedDates}
          />
        </Col>
      </Row>

      <FaceVerificationModal
        apartment={apartment}
        open={showModal}
        onCancel={() => setShowModal(false)}
        onSuccess={() => {
          setShowModal(false);
          console.log("Заказ подтверждён!");
        }}
      />
    </div>
  );
};

export default ApartmentDetail;
