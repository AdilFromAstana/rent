import { Card, DatePicker, Select, Button } from "antd";
import dayjs from "dayjs";
import { useFilters } from "../../../../context/FilterContext";
import { useState } from "react";
import isBetween from "dayjs/plugin/isBetween"; // <-- подключаем
dayjs.extend(isBetween); // <-- активируем

const { RangePicker } = DatePicker;
const { Option } = Select;

const BookingCard = ({ price, onBooking, bookedDates }) => {
  const { setSelectedDates, selectedDates } = useFilters();
  const [guests, setGuests] = useState(1);
  const [isPickingCheckOut, setIsPickingCheckOut] = useState(false);

  const parseDate = (d) => dayjs(d).startOf("day");

  const getNextBookedDate = (fromDate) => {
    const allBooked = bookedDates.flatMap(([start, end]) => {
      const startDate = parseDate(start);
      const endDate = parseDate(end);
      const days = endDate.diff(startDate, "day");
      return Array.from({ length: days + 1 }, (_, i) =>
        startDate.add(i, "day")
      );
    });

    return allBooked.find((d) => d.isAfter(fromDate));
  };

  const isDateBooked = (date) => {
    const d = dayjs(date).startOf("day");
    return bookedDates.some(([start, end]) =>
      d.isBetween(parseDate(start), parseDate(end), null, "[]")
    );
  };

  const disableDate = (current) => {
    const today = dayjs().startOf("day");
    const date = dayjs(current).startOf("day");

    if (date.isBefore(today)) return true;

    // Если дата уже занята — отключаем
    if (isDateBooked(date)) return true;

    const checkIn = selectedDates?.[0]
      ? dayjs(selectedDates[0]).startOf("day")
      : null;

    if (checkIn) {
      const nextBooked = getNextBookedDate(checkIn);

      // Блокируем даты до check-in (назад нельзя выбрать)
      if (date.isBefore(checkIn)) return true;

      // Если ближайшая бронь позже — ограничиваем
      if (nextBooked && date.isAfter(nextBooked)) return true;
    }

    return false;
  };

  const rangesOverlap = (range1, range2) => {
    const [start1, end1] = range1.map((d) => dayjs(d).startOf("day"));
    const [start2, end2] = range2.map((d) => dayjs(d).startOf("day"));
    return start1.isBefore(end2) && end1.isAfter(start2);
  };

  const handleDateChange = (dates) => {
    if (!dates || !dates[0]) {
      setSelectedDates([null, null]);
      setIsPickingCheckOut(false);
      return;
    }

    // Выбор даты заезда
    if (!isPickingCheckOut) {
      setSelectedDates([dates[0].toISOString(), null]);
      setIsPickingCheckOut(true);
      return;
    }

    // Выбор даты выезда
    if (dates[0] && dates[1]) {
      const range = [dates[0], dates[1]];
      const hasConflict = bookedDates.some((booked) =>
        rangesOverlap(
          range,
          booked.map((d) => dayjs(d))
        )
      );

      if (hasConflict) {
        alert("Выбранный период пересекается с уже забронированными датами.");
        return;
      }

      setSelectedDates([dates[0].toISOString(), dates[1].toISOString()]);
      setIsPickingCheckOut(false);
    }
  };

  const nights =
    selectedDates?.[0] && selectedDates?.[1]
      ? dayjs(selectedDates[1]).diff(dayjs(selectedDates[0]), "day")
      : 0;

  const total = nights * price;

  return (
    <div className="sticky-card">
      <Card className="info">
        <div className="booking-box">
          <div className="price-line">
            <span className="price">₸{price.toLocaleString()}</span>
            <span className="per-night">за 1 ночь</span>
          </div>

          <RangePicker
            size="large"
            format="DD.MM.YYYY"
            disabledDate={disableDate}
            value={
              selectedDates?.[0]
                ? [
                    dayjs(selectedDates[0]),
                    selectedDates[1] ? dayjs(selectedDates[1]) : null,
                  ]
                : [null, null]
            }
            onCalendarChange={handleDateChange}
            renderExtraFooter={() => {
              const legend = [
                { label: "Начало/Конец брони", color: "#1677ff" }, // синий
                { label: "Промежуточные дни", color: "#91caff" }, // голубой
                { label: "Занятые дни", color: "#f0f0f0", border: "#ccc" }, // серый
              ];

              return (
                <div
                  style={{
                    fontSize: 14,
                    paddingTop: 4,
                    display: "flex",
                    gap: 16,
                  }}
                >
                  {legend.map((item, idx) => (
                    <div
                      key={idx}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: 16,
                          height: 16,
                          backgroundColor: item.color,
                          border: `1px solid ${item.border || item.color}`,
                          marginRight: 6,
                          borderRadius: 4,
                        }}
                      />
                      <span style={{ textTransform: "uppercase" }}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              );
            }}
          />

          <Select
            value={guests}
            onChange={setGuests}
            style={{ width: "100%", marginBottom: 16 }}
          >
            <Option value={1}>1 гость</Option>
            <Option value={2}>2 гостя</Option>
            <Option value={3}>3 гостя</Option>
            <Option value={4}>4 гостя</Option>
          </Select>

          {nights > 0 && (
            <div style={{ marginBottom: 16 }}>
              <p style={{ margin: 0, fontWeight: 500 }}>
                {nights} ночей × ₸{price.toLocaleString()} =
              </p>
              <p style={{ fontSize: 20, fontWeight: 600 }}>
                ₸{total.toLocaleString()}
              </p>
            </div>
          )}

          <Button
            type="primary"
            block
            disabled={!selectedDates?.[0] || !selectedDates?.[1]}
            onClick={onBooking}
          >
            Забронировать
          </Button>
          <p className="note">Пока вы ни за что не платите</p>
        </div>
      </Card>
    </div>
  );
};

export default BookingCard;
