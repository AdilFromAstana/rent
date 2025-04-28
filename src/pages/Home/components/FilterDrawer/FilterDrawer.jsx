import { Button, Col, Drawer, InputNumber, Row, Select } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const { Option } = Select;

const FilterDrawer = ({
  visible,
  onClose,
  roomsFilter,
  setRoomsFilter,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  openDatePicker,
  resetFilters,
}) => {
  return (
    <Drawer
      title="Фильтры"
      placement="bottom"
      onClose={onClose}
      open={visible}
      styles={{ wrapper: { height: "100%" } }}
    >
      <Row gutter={[16, 16]} align="middle">
        <Col span={24}>
          <label>Дата заезда - выезда</label>
          <Button
            icon={<CalendarOutlined />}
            onClick={openDatePicker}
            style={{ width: "100%" }}
            size="large"
          >
            Выбрать даты
          </Button>
        </Col>

        <Col span={24}>
          <label>Количество комнат</label>
          <Select
            value={roomsFilter}
            onChange={setRoomsFilter}
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
            onChange={setMinPrice}
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
            onChange={setMaxPrice}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>

      <Row justify="space-between" style={{ marginTop: 20 }}>
        <Button onClick={resetFilters} size="large">
          Сбросить
        </Button>
        <Button type="primary" onClick={onClose} size="large">
          Применить
        </Button>
      </Row>
    </Drawer>
  );
};

export default FilterDrawer;
