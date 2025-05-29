import { Button, DatePicker, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useFilters } from "../../../../context/FilterContext";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { RangePicker } = DatePicker;

const FiltersButton = () => {
  const { city, setCity, selectedDates, setSelectedDates } = useFilters();
  const nav = useNavigate();
  const disablePastDates = (current) => {
    return current && current < dayjs().startOf("day");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
      <Select
        placeholder="Выберите город"
        size="large"
        style={{ width: 200 }}
        value={city}
        onChange={(value) => setCity(value)}
      >
        <Option value="astana">Астана</Option>
        <Option value="almaty">Алматы</Option>
      </Select>

      <RangePicker
        size="large"
        format="DD.MM.YYYY"
        disabledDate={disablePastDates}
        value={
          selectedDates?.[0]
            ? [dayjs(selectedDates[0]), dayjs(selectedDates[1])]
            : [null, null]
        }
        onChange={(dates) =>
          setSelectedDates(
            dates
              ? [dates[0]?.toISOString(), dates[1]?.toISOString()]
              : [null, null]
          )
        }
      />

      <Button
        type="primary"
        icon={<SearchOutlined />}
        size="large"
        onClick={() => nav("/apartments")}
      >
        Поиск
      </Button>
    </div>
  );
};

export default FiltersButton;
