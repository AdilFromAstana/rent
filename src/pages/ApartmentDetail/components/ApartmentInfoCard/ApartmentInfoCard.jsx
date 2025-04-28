import { Card } from "antd";

const ApartmentInfoCard = ({ title, price, rentalDays, description }) => {
  const totalPrice = rentalDays * price;

  return (
    <Card
      className="apartment-info"
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      <h1 className="apartment-title">{title}</h1>
      <p className="apartment-price">
        <strong>Цена за сутки:</strong> {price} ₸
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
        <strong>Описание:</strong> {description}
      </p>
    </Card>
  );
};

export default ApartmentInfoCard;
