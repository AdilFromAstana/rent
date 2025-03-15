import { Link, useNavigate, useParams } from "react-router-dom";
import { Carousel, Button, Card } from "antd";
import { LeftOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useFilters } from "../context/FilterContext"; // Используем фильтры
import apartments from "../data/apartments";
import "./ApartmentDetail.css";
import { Circle, Map, Placemark, YMaps } from "react-yandex-maps";
import dayjs from "dayjs";

const MobileOnlyPage = () => (
  <div style={{ textAlign: "center", padding: "50px", color: "black" }}>
    <h1>Этот сайт доступен только с мобильных устройств</h1>
    <p>Попробуйте открыть его на телефоне или уменьшите размер окна.</p>
  </div>
);

function ApartmentDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { selectedDates } = useFilters(); // Получаем даты из контекста
  const apartment = {
    ...apartments.find((apt) => apt.id === Number(id)),
    coordinates: { lat: 51.1694, lng: 71.4491 },
  };
  const [isFavorite, setIsFavorite] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMobile) {
    return <MobileOnlyPage />;
  }

  if (!apartment) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        Квартира не найдена
      </h2>
    );
  }

  // Подсчет количества дней аренды
  const rentalDays =
    selectedDates[0] && selectedDates[1]
      ? dayjs(selectedDates[1]).diff(dayjs(selectedDates[0]), "day")
      : 0;

  const totalPrice = rentalDays * apartment.price; // Итоговая стоимость

  return (
    <YMaps>
      <div className="apartment-detail-container">
        {/* Верхний бар с кнопками */}
        <div className="top-bar">
          <Button
            icon={<LeftOutlined />}
            size="large"
            shape="circle"
            onClick={() => nav("..")}
          />
          <Button
            icon={
              isFavorite ? (
                <HeartFilled style={{ color: "red" }} />
              ) : (
                <HeartOutlined />
              )
            }
            size="large"
            shape="circle"
            onClick={() => setIsFavorite(!isFavorite)}
          />
        </div>

        {/* Галерея изображений */}
        <Carousel autoplay className="apartment-carousel">
          {apartment.images.map((img, index) => (
            <div key={index} className="carousel-slide">
              <img
                //   src={img}
                src="https://astps-photos-kr.kcdn.kz/webp/43/4325bb1e-b39e-4b30-8d04-45e46adbc7d2/1-400x300.webp"
                alt={`${apartment.title} ${index + 1}`}
                className="carousel-image"
              />
            </div>
          ))}
        </Carousel>

        {/* Информация о квартире */}
        <Card
          className="apartment-info"
          styles={{
            body: {
              padding: 0,
            },
          }}
        >
          <h1 className="apartment-title">{apartment.title}</h1>
          <p className="apartment-price">
            <strong>Цена за сутки:</strong> {apartment.price} ₸
          </p>
          {rentalDays > 0 && (
            <p className="apartment-price">
              <strong>
                Общая сумма за {rentalDays} {rentalDays > 1 ? "ночи" : "ночь"}:
              </strong>{" "}
              {totalPrice} ₸
            </p>
          )}
          <p className="apartment-description">
            <strong>Описание:</strong> {apartment.description}
          </p>
        </Card>

        {/* Карта с отметкой */}
        <div className="map-container">
          <h3>Где вы будете</h3>
          <p>{apartment.location}</p>
          <Map
            defaultState={{
              center: [apartment.coordinates.lat, apartment.coordinates.lng],
              zoom: 14,
            }}
            className="map"
          >
            <Circle
              geometry={[
                [apartment.coordinates.lat, apartment.coordinates.lng],
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
              geometry={[apartment.coordinates.lat, apartment.coordinates.lng]}
              options={{
                preset: "islands#redHomeIcon",
              }}
            />
          </Map>
        </div>

        {/* Блок бронирования */}
        <div className="booking-footer">
          <p className="booking-price">
            {rentalDays > 0
              ? `${totalPrice} ₸ за ${rentalDays} ночей`
              : `${apartment.price} ₸/ночь`}
          </p>
          <Button type="primary" size="large" className="booking-button">
            Забронировать
          </Button>
        </div>
      </div>
    </YMaps>
  );
}

export default ApartmentDetail;
