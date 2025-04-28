import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useFilters } from "../../../../context/FilterContext";
import dayjs from "dayjs";

const FiltersButton = ({ onClick }) => {
  const { roomsFilter, minPrice, maxPrice, selectedDates } = useFilters();

  const formatDates = () => {
    if (!selectedDates[0] || !selectedDates[1]) return "Выбрать даты";
    return `${dayjs(selectedDates[0]).format("D")}–${dayjs(
      selectedDates[1]
    ).format("D MMM")}`;
  };

  const formatFilters = () => {
    let filters = [];

    if (selectedDates[0] && selectedDates[1]) {
      filters.push(formatDates());
    }
    if (roomsFilter !== "all") {
      filters.push(`${roomsFilter}-комн.`);
    }
    if (minPrice || maxPrice) {
      filters.push(
        `${minPrice ? `${minPrice} ₸` : ""} - ${
          maxPrice ? `${maxPrice} ₸` : ""
        }`
      );
    }

    return filters.length ? filters.join(" • ") : "Найти квартиру";
  };

  return (
    <Button
      type="primary"
      icon={<SearchOutlined />}
      onClick={onClick}
      style={{ marginBottom: 20, width: "100%" }}
      size="large"
    >
      {formatFilters()}
    </Button>
  );
};

export default FiltersButton;
