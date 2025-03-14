import { createContext, useContext, useEffect, useState } from "react";

const FilterContext = createContext();

export const useFilters = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  // Загружаем фильтры из LocalStorage
  const loadFromStorage = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  const [roomsFilter, setRoomsFilter] = useState(
    loadFromStorage("roomsFilter", "all")
  );
  const [minPrice, setMinPrice] = useState(loadFromStorage("minPrice", null));
  const [maxPrice, setMaxPrice] = useState(loadFromStorage("maxPrice", null));
  const [sortOrder, setSortOrder] = useState(
    loadFromStorage("sortOrder", "default")
  );
  const [selectedDates, setSelectedDates] = useState(
    loadFromStorage("selectedDates", [null, null])
  );

  // Сохраняем в LocalStorage при изменении
  useEffect(
    () => localStorage.setItem("roomsFilter", JSON.stringify(roomsFilter)),
    [roomsFilter]
  );
  useEffect(
    () => localStorage.setItem("minPrice", JSON.stringify(minPrice)),
    [minPrice]
  );
  useEffect(
    () => localStorage.setItem("maxPrice", JSON.stringify(maxPrice)),
    [maxPrice]
  );
  useEffect(
    () => localStorage.setItem("sortOrder", JSON.stringify(sortOrder)),
    [sortOrder]
  );
  useEffect(
    () => localStorage.setItem("selectedDates", JSON.stringify(selectedDates)),
    [selectedDates]
  );

  return (
    <FilterContext.Provider
      value={{
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
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
