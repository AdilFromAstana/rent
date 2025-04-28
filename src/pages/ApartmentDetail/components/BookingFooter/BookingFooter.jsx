import { Button } from "antd";

const BookingFooter = ({ price, rentalDays, onBook }) => {
  const totalPrice = rentalDays * price;

  return (
    <div className="booking-footer">
      <p className="booking-price">
        {rentalDays > 0
          ? `${totalPrice} ₸ за ${rentalDays} ночей`
          : `${price} ₸/ночь`}
      </p>
      <Button
        type="primary"
        size="large"
        className="booking-button"
        onClick={onBook}
      >
        Забронировать
      </Button>
    </div>
  );
};

export default BookingFooter;
