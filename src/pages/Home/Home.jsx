import { useState } from "react";
import { Row, Col, Empty } from "antd";
import dayjs from "dayjs";
import FiltersButton from "./components/FiltersButton/FiltersButton";
import FilterDrawer from "./components/FilterDrawer/FilterDrawer";
import DatePickerDrawer from "./components/DatePickerDrawer/DatePickerDrawer";
import ApartmentCard from "./components/ApartmentCard/ApartmentCard";
import { useFilters } from "../../context/FilterContext";
import "./Home.scss";

const Home = () => {
  const {
    roomsFilter,
    setRoomsFilter,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    sortOrder,
    selectedDates,
    setSelectedDates,
    filteredApartments,
  } = useFilters();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [dateDrawerVisible, setDateDrawerVisible] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const rentalDays =
    selectedDates[0] && selectedDates[1]
      ? dayjs(selectedDates[1]).diff(dayjs(selectedDates[0]), "day")
      : 0;

  const resetFilters = () => {
    setRoomsFilter("all");
    setMinPrice(null);
    setMaxPrice(null);
    setSelectedDates([null, null]);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", marginBottom: 20, marginTop: 0 }}>
        Список квартир в аренду
      </h1>

      <FiltersButton />

      <FilterDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        roomsFilter={roomsFilter}
        setRoomsFilter={setRoomsFilter}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        openDatePicker={() => setDateDrawerVisible(true)}
        resetFilters={resetFilters}
      />

      <DatePickerDrawer
        visible={dateDrawerVisible}
        onClose={() => setDateDrawerVisible(false)}
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
      />

      <Row gutter={[16, 16]} justify="center">
        {filteredApartments.length > 0 ? (
          filteredApartments.map((apartment) => (
            <Col key={apartment.id} xs={24} sm={12} md={8} lg={8} xl={6}>
              <ApartmentCard
                apartment={apartment}
                rentalDays={rentalDays}
                isFavorite={favorites.includes(apartment.id)}
                toggleFavorite={toggleFavorite}
              />
            </Col>
          ))
        ) : (
          <Col span={24} style={{ textAlign: "center", marginTop: 50 }}>
            <Empty description="Нет квартир, соответствующих фильтрам" />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Home;
