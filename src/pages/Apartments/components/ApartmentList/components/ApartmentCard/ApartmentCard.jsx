import { Card } from "antd";
import dayjs from "dayjs";
import { useFilters } from "../../../../../../context/FilterContext";

const ApartmentCard = ({ apartment, onClick }) => {
  const { selectedDates } = useFilters();

  const nights =
    selectedDates?.[0] && selectedDates?.[1]
      ? dayjs(selectedDates[1]).diff(dayjs(selectedDates[0]), "day")
      : 0;

  const totalPrice = nights * apartment.price;

  return (
    <Card
      hoverable
      className="apartment-card"
      cover={<img alt={apartment.title} src={apartment.images[0]} />}
      onClick={onClick}
    >
      <div className="card-content">
        <h4 className="title">{apartment.title}</h4>
        <p className="desc">{apartment.description}</p>
        <div className="prices">
          <div className="price-info">
            {apartment.beds && <span>{apartment.beds} кровать</span>}
            <strong>₸{apartment.price.toLocaleString()} / ночь</strong>
          </div>
          {nights > 0 && (
            <div className="total-price">
              Всего за {nights} ночей: <b>₸{totalPrice.toLocaleString()}</b>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ApartmentCard;
