import { createContext, useContext, useEffect, useState } from "react";
import apartments from "../data/apartments";

const FilterContext = createContext();
export const useFilters = () => useContext(FilterContext);

// Функция для проверки пересечения дат
const isDateRangeOverlap = ([start1, end1], [start2, end2]) => {
  return start1 <= end2 && start2 <= end1;
};

export const FilterProvider = ({ children }) => {
  const loadFromStorage = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  const [comforts, setComforts] = useState(loadFromStorage("comforts", []));
  const [city, setCity] = useState(loadFromStorage("city", null));
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

  const [minMetr, setMinMetr] = useState(loadFromStorage("minMetr", null));
  const [maxMetr, setMaxMetr] = useState(loadFromStorage("maxMetr", null));
  const [minFloor, setMinFloor] = useState(loadFromStorage("minFloor", null));
  const [maxFloor, setMaxFloor] = useState(loadFromStorage("maxFloor", null));

  const [filteredApartments, setFilteredApartments] = useState([]);

  // Сохраняем фильтры в localStorage
  useEffect(
    () => localStorage.setItem("comforts", JSON.stringify(comforts)),
    [comforts]
  );
  useEffect(() => localStorage.setItem("city", JSON.stringify(city)), [city]);
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
  useEffect(
    () => localStorage.setItem("minMetr", JSON.stringify(minMetr)),
    [minMetr]
  );
  useEffect(
    () => localStorage.setItem("maxMetr", JSON.stringify(maxMetr)),
    [maxMetr]
  );
  useEffect(
    () => localStorage.setItem("minFloor", JSON.stringify(minFloor)),
    [minFloor]
  );
  useEffect(
    () => localStorage.setItem("maxFloor", JSON.stringify(maxFloor)),
    [maxFloor]
  );

  useEffect(() => {
    const [selectedStart, selectedEnd] = selectedDates || [];

    let filtered = apartments.filter((apartment) => {
      const matchesComforts =
        comforts.length === 0 ||
        comforts.every((c) => apartment.comforts?.includes(c));

      const matchesMetr =
        (minMetr === null || apartment.metrSquare >= minMetr) &&
        (maxMetr === null || apartment.metrSquare <= maxMetr);

      const matchesFloor =
        (minFloor === null || apartment.floor >= minFloor) &&
        (maxFloor === null || apartment.floor <= maxFloor);

      const matchesRooms =
        roomsFilter === "all" || apartment.roomsCount === Number(roomsFilter);

      const matchesPrice =
        (minPrice === null || apartment.price >= minPrice) &&
        (maxPrice === null || apartment.price <= maxPrice);

      const matchesDates =
        !selectedStart ||
        !selectedEnd ||
        apartment.bookedDates?.every(
          ([bookedStart, bookedEnd]) =>
            !isDateRangeOverlap(
              [new Date(selectedStart), new Date(selectedEnd)],
              [new Date(bookedStart), new Date(bookedEnd)]
            )
        );

      return (
        matchesComforts &&
        matchesMetr &&
        matchesFloor &&
        matchesRooms &&
        matchesPrice &&
        matchesDates
      );
    });

    // Сортировка
    filtered = [...filtered].sort((a, b) => {
      if (sortOrder === "priceAsc") return a.price - b.price;
      if (sortOrder === "priceDesc") return b.price - a.price;
      return 0;
    });

    setFilteredApartments(filtered);
  }, [
    comforts,
    city,
    roomsFilter,
    minPrice,
    maxPrice,
    sortOrder,
    selectedDates,
    minMetr,
    maxMetr,
    minFloor,
    maxFloor,
  ]);

  return (
    <FilterContext.Provider
      value={{
        city,
        setCity,
        roomsFilter,
        setRoomsFilter,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        sortOrder,
        setSortOrder,
        comforts,
        setComforts,
        selectedDates,
        setSelectedDates,
        filteredApartments,
        minMetr,
        setMinMetr,
        maxMetr,
        setMaxMetr,
        minFloor,
        setMinFloor,
        maxFloor,
        setMaxFloor,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
