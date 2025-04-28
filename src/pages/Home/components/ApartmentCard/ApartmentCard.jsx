import { Link } from "react-router-dom";
import { Button, Card } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

const ApartmentCard = ({
  apartment,
  rentalDays,
  isFavorite,
  toggleFavorite,
}) => {
  const totalPrice = rentalDays * apartment.price;

  return (
    <Link to={`/apartment/${apartment.id}`}>
      <Card
        styles={{ body: { padding: 10 } }}
        cover={
          <div style={{ position: "relative" }}>
            <img
              alt={apartment.title}
              src="https://astps-photos-kr.kcdn.kz/webp/43/4325bb1e-b39e-4b30-8d04-45e46adbc7d2/1-400x300.webp"
              style={{ height: 200, objectFit: "cover", width: "100%" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 10,
                left: 5,
                display: "flex",
                gap: "5px",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(0, 128, 0, 1)",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Сейчас свободна
              </div>
              <div
                style={{
                  backgroundColor: "rgba(255, 0, 0, 1)",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Kaspi RED
              </div>
            </div>
            <Button
              shape="circle"
              icon={
                isFavorite ? (
                  <HeartFilled style={{ color: "red", fontSize: 20 }} />
                ) : (
                  <HeartOutlined style={{ fontSize: 20 }} />
                )
              }
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(apartment.id);
              }}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "white",
                border: "none",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                height: 40,
                width: 40,
              }}
            />
          </div>
        }
      >
        <Card.Meta
          title={apartment.title}
          description={
            <>
              <p>
                <strong>Цена:</strong> {apartment.price} ₸/сутки
              </p>
              {rentalDays > 0 && (
                <p>
                  <strong>Общая сумма:</strong> {totalPrice} ₸
                </p>
              )}
            </>
          }
        />
      </Card>
    </Link>
  );
};

export default ApartmentCard;
