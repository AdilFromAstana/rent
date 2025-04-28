import { Button, Drawer, Space } from "antd";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";

const DatePickerDrawer = ({
  visible,
  onClose,
  selectedDates,
  setSelectedDates,
}) => {
  const today = dayjs().startOf("day");
  const maxStayDays = 30;

  const isDateDisabled = (date) => {
    const day = dayjs(date);
    return day.isBefore(today);
  };

  const handleDateChange = (range) => {
    if (range.length === 2) {
      const start = dayjs(range[0]);
      const end = dayjs(range[1]);

      if (end.diff(start, "day") > maxStayDays) {
        alert(`Максимальный срок аренды — ${maxStayDays} дней.`);
        return;
      }

      setSelectedDates([start.toDate(), end.toDate()]);
    }
  };

  return (
    <Drawer
      title="Выбор дат"
      placement="bottom"
      onClose={onClose}
      open={visible}
      styles={{
        wrapper: { height: "75%" },
        body: { margin: "0px auto", padding: 0 },
      }}
    >
      <Calendar
        selectRange
        tileDisabled={({ date }) => isDateDisabled(date)}
        onChange={handleDateChange}
        value={selectedDates}
      />
      <Space
        style={{ marginTop: 10, display: "flex", justifyContent: "center" }}
      >
        <Button onClick={() => setSelectedDates([null, null])}>Сбросить</Button>
        <Button
          type="primary"
          onClick={onClose}
          disabled={!selectedDates[0] || !selectedDates[1]}
        >
          Далее
        </Button>
      </Space>
    </Drawer>
  );
};

export default DatePickerDrawer;
