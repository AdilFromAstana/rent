import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useFilters } from "../../../../context/FilterContext";

const { RangePicker } = DatePicker;

const disablePastDates = (current) => {
  return current && current < dayjs().startOf("day");
};

const DateRangePicker = () => {
  const { selectedDates, setSelectedDates } = useFilters();

  return (
    <RangePicker
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
  );
};

export default DateRangePicker;
