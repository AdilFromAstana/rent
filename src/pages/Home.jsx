import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Select,
  InputNumber,
  Card,
  Row,
  Col,
  Empty,
  Button,
  Drawer,
  Space,
  Typography,
} from "antd";
import {
  SearchOutlined,
  CalendarOutlined,
  ConsoleSqlOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import apartments from "../data/apartments";
import dayjs from "dayjs";
import "react-calendar/dist/Calendar.css";
import "dayjs/locale/ru";
import { useFilters } from "../context/FilterContext";

const { Option } = Select;
const { Text } = Typography;

const Home = () => {
  const {
    roomsFilter,
    setRoomsFilter,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    sortOrder,
    setSortOrder,
    selectedDates,
    setSelectedDates,
  } = useFilters();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [dateDrawerVisible, setDateDrawerVisible] = useState(false);
  const [favorites, setFavorites] = useState([]); // Избранное

  const today = dayjs().startOf("day"); // Сегодня
  const maxStayDays = 30; // Максимальная аренда 30 дней

  // Количество дней аренды
  const rentalDays =
    selectedDates[0] && selectedDates[1]
      ? dayjs(selectedDates[1]).diff(dayjs(selectedDates[0]), "day")
      : 0;

  console.log("selectedDates: ", selectedDates);

  // Фильтрация квартир
  const filteredApartments = apartments.filter((apartment) => {
    const matchesRooms =
      roomsFilter === "all" || apartment.roomsCount === Number(roomsFilter);

    const matchesPrice =
      (minPrice === null || apartment.price >= minPrice) &&
      (maxPrice === null || apartment.price <= maxPrice);

    return matchesRooms && matchesPrice;
  });

  // Сортировка
  const sortedApartments = [...filteredApartments].sort((a, b) => {
    if (sortOrder === "priceAsc") return a.price - b.price;
    if (sortOrder === "priceDesc") return b.price - a.price;
    return 0;
  });

  // Сбросить фильтры
  const resetFilters = () => {
    setRoomsFilter("all");
    setMinPrice(null);
    setMaxPrice(null);
    setSortOrder("default");
    setSelectedDates([null, null]);
  };

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

  // Обновление диапазона дат
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

  const isDateDisabled = (date) => {
    const day = dayjs(date);
    return day.isBefore(today); // Запрещаем прошлые даты
  };

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((fav) => fav !== id)
        : [...prevFavorites, id]
    );
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", marginBottom: 20, marginTop: 0 }}>
        Список квартир в аренду
      </h1>

      {/* Кнопка для открытия фильтров */}
      <Button
        type="primary"
        icon={<SearchOutlined />}
        onClick={() => setDrawerVisible(true)}
        style={{ marginBottom: 20, width: "100%" }}
        size="large"
      >
        {/* Найти квартиру */}
        {formatFilters()}
      </Button>

      {/* Drawer с фильтрами */}
      <Drawer
        title="Фильтры"
        placement="bottom"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        styles={{
          wrapper: {
            height: "100%",
          },
        }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col span={24}>
            <label>Дата заезда - выезда</label>
            <Button
              icon={<CalendarOutlined />}
              onClick={() => setDateDrawerVisible(true)}
              style={{ width: "100%" }}
              size="large"
            >
              {selectedDates[0] && selectedDates[1]
                ? `${dayjs(selectedDates[0]).format("D MMM")} - ${dayjs(
                    selectedDates[1]
                  ).format("D MMM")}`
                : "Выбрать даты"}
            </Button>
          </Col>

          <Col span={24}>
            <label>Количество комнат</label>
            <Select
              value={roomsFilter}
              onChange={(value) => setRoomsFilter(value)}
              style={{ width: "100%" }}
              size="large"
            >
              <Option value="all">Все</Option>
              <Option value="1">1-комнатные</Option>
              <Option value="2">2-комнатные</Option>
            </Select>
          </Col>

          <Col span={24}>
            <label>Цена от</label>
            <InputNumber
              size="large"
              placeholder="Мин."
              min={0}
              value={minPrice}
              onChange={(value) => setMinPrice(value)}
              style={{ width: "100%" }}
            />
          </Col>

          <Col span={24}>
            <label>Цена до</label>
            <InputNumber
              size="large"
              placeholder="Макс."
              min={0}
              value={maxPrice}
              onChange={(value) => setMaxPrice(value)}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>

        <Row justify="space-between" style={{ marginTop: 20 }}>
          <Button onClick={resetFilters} size="large">
            Сбросить
          </Button>
          <Button
            type="primary"
            onClick={() => setDrawerVisible(false)}
            size="large"
          >
            Применить
          </Button>
        </Row>
      </Drawer>

      {/* Drawer для выбора дат */}
      <Drawer
        title="Выбор дат"
        placement="bottom"
        onClose={() => setDateDrawerVisible(false)}
        open={dateDrawerVisible}
        styles={{
          wrapper: {
            height: "75%",
          },
          body: {
            margin: "0px auto",
            padding: 0,
          },
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
          <Button onClick={() => setSelectedDates([null, null])}>
            Сбросить
          </Button>
          <Button
            type="primary"
            onClick={() => setDateDrawerVisible(false)}
            disabled={!selectedDates[0] || !selectedDates[1]}
          >
            Далее
          </Button>
        </Space>
      </Drawer>

      {/* Список квартир */}
      <Row gutter={[16, 16]} justify="center">
        {sortedApartments.length > 0 ? (
          sortedApartments.map((apartment) => {
            const totalPrice = rentalDays * apartment.price;
            const isFavorite = favorites.includes(apartment.id);

            return (
              <Col key={apartment.id} xs={24} sm={12} md={8} lg={6}>
                <Link to={`/apartment/${apartment.id}`}>
                  <Card
                    styles={{
                      body: {
                        padding: 10,
                      },
                    }}
                    cover={
                      <div style={{ position: "relative" }}>
                        <img
                          alt={apartment.title}
                          src="https://astps-photos-kr.kcdn.kz/webp/43/4325bb1e-b39e-4b30-8d04-45e46adbc7d2/1-400x300.webp"
                          style={{
                            height: 200,
                            objectFit: "cover",
                            width: "100%",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: 10,
                            left: 5,
                            display: "flex",
                            gap: "5px", // Отступ между элементами
                          }}
                        >
                          {/* Надпись "Сейчас свободна" */}
                          <div
                            style={{
                              backgroundColor: "rgba(0, 128, 0, 1)", // Зеленый фон
                              color: "white",
                              padding: "5px 10px",
                              borderRadius: "5px",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                          >
                            Сейчас свободна
                          </div>

                          {/* Надпись "Kaspi RED" */}
                          <div
                            style={{
                              backgroundColor: "rgba(255, 0, 0, 1)", // Красный фон
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

                        {/* Кнопка "В избранное" */}
                        <Button
                          shape="circle"
                          icon={
                            isFavorite ? (
                              <HeartFilled
                                style={{ color: "red", fontSize: 20 }}
                              />
                            ) : (
                              <HeartOutlined style={{ fontSize: 20 }} />
                            )
                          }
                          onClick={() => toggleFavorite(apartment.id)}
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
              </Col>
            );
          })
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
