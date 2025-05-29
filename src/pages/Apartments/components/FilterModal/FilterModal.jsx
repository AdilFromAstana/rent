import { Modal, Slider, InputNumber, Tag } from "antd";
const { CheckableTag } = Tag;
import apartments from "../../../../data/apartments";

const comfortOptions = [
  "Wi-Fi",
  "Парковка",
  "Кондиционер",
  "Стиральная машина",
];

const FilterModal = ({
  visible,
  onClose,
  onApply,
  localMaxPrice,
  setLocalMaxPrice,
  localMinMetr,
  localMaxMetr,
  setLocalMinMetr,
  setLocalMaxMetr,
  localMinFloor,
  localMaxFloor,
  setLocalMinFloor,
  setLocalMaxFloor,
  localComforts,
  setLocalComforts,
  setLocalMinPrice,
  localMinPrice,
}) => {
  const prices = apartments.map((apt) => apt.price);
  const absoluteMinPrice = Math.min(...prices);
  const absoluteMaxPrice = Math.max(...prices);

  return (
    <Modal
      title="Фильтры"
      maskClosable={false}
      open={visible}
      onCancel={onClose}
      onOk={onApply}
      okText="Применить"
      cancelText="Отмена"
      className="filters-modal"
    >
      <div className="filter-section">
        <h4>Стоимость за ночь</h4>
        <Slider
          range
          min={absoluteMinPrice}
          max={absoluteMaxPrice}
          value={[localMinPrice, localMaxPrice]}
          onChange={([min, max]) => {
            setLocalMinPrice(min);
            setLocalMaxPrice(max);
          }}
        />
        <div className="price-values">
          <span>₸{absoluteMinPrice}</span>
          <span>₸{absoluteMaxPrice}</span>
        </div>
      </div>

      <div className="filter-section">
        <h4>Квадратура (м²)</h4>
        <div style={{ display: "flex", gap: 8 }}>
          <InputNumber
            min={0}
            value={localMinMetr}
            onChange={setLocalMinMetr}
            placeholder="от"
            style={{ width: "100%" }}
          />
          <InputNumber
            min={0}
            value={localMaxMetr}
            onChange={setLocalMaxMetr}
            placeholder="до"
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <div className="filter-section">
        <h4>Этаж</h4>
        <div style={{ display: "flex", gap: 8 }}>
          <InputNumber
            min={1}
            value={localMinFloor}
            onChange={setLocalMinFloor}
            placeholder="от"
            style={{ width: "100%" }}
          />
          <InputNumber
            min={1}
            value={localMaxFloor}
            onChange={setLocalMaxFloor}
            placeholder="до"
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <div className="filter-section">
        <h4>Удобства</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {comfortOptions.map((item) => (
            <CheckableTag
              key={item}
              checked={localComforts.includes(item)}
              onChange={(checked) => {
                const updated = checked
                  ? [...localComforts, item]
                  : localComforts.filter((c) => c !== item);
                setLocalComforts(updated);
              }}
            >
              {item}
            </CheckableTag>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;
