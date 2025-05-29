import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApartmentList from "./components/ApartmentList/ApartmentList";
import ApartmentMap from "./components/ApartmentMap/ApartmentMap";
import DateRangePicker from "./components/DateRangePicker/DateRangePicker";
import { FilterOutlined } from "@ant-design/icons";
import { useFilters } from "../../context/FilterContext";
import { Button } from "antd";
import "./Apartments.scss";
import FilterModal from "./components/FilterModal/FilterModal";

const Apartments = () => {
  const {
    city,
    filteredApartments,
    maxPrice,
    minPrice,
    setMaxPrice,
    setMinPrice,
    comforts,
    setComforts,
    minMetr,
    maxMetr,
    setMinMetr,
    setMaxMetr,
    minFloor,
    maxFloor,
    setMinFloor,
    setMaxFloor,
  } = useFilters();

  const [localMinMetr, setLocalMinMetr] = useState(minMetr);
  const [localMaxMetr, setLocalMaxMetr] = useState(maxMetr);
  const [localMinFloor, setLocalMinFloor] = useState(minFloor);
  const [localMaxFloor, setLocalMaxFloor] = useState(maxFloor);

  const [selectedApartment, setSelectedApartment] = useState(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const nav = useNavigate();

  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localComforts, setLocalComforts] = useState(comforts || []);

  useEffect(() => {
    setLocalMinPrice(minPrice);
    setLocalMaxPrice(maxPrice);
    setLocalComforts(comforts || []);
    setLocalMinMetr(minMetr || 30);
    setLocalMaxMetr(maxMetr || 80);
    setLocalMinFloor(minFloor || 1);
    setLocalMaxFloor(maxFloor || 10);
  }, [filterModalVisible]);

  const applyFilters = () => {
    setFilterModalVisible(false);

    setMinPrice(localMinPrice);
    setMaxPrice(localMaxPrice);
    setComforts(localComforts);
    setMinMetr(localMinMetr);
    setMaxMetr(localMaxMetr);
    setMinFloor(localMinFloor);
    setMaxFloor(localMaxFloor);
  };

  return (
    <div className="apartments-layout">
      <div className="apartments-list">
        <div className="list-header">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="header-title">
              {city === "almaty" ? "Алматы" : "Астана"}:{" "}
              {filteredApartments.length} вариантов
            </div>
            <Button
              icon={<FilterOutlined />}
              onClick={() => setFilterModalVisible(true)}
            >
              Фильтры
            </Button>
          </div>
          <DateRangePicker />
        </div>

        <ApartmentList
          apartments={filteredApartments}
          onSelect={setSelectedApartment}
        />
      </div>

      <div className="apartments-map">
        <ApartmentMap
          apartments={filteredApartments}
          selectedApartment={selectedApartment}
          onSelect={setSelectedApartment}
          onNavigate={nav}
        />
      </div>

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={applyFilters}
        localMaxPrice={localMaxPrice}
        setLocalMaxPrice={setLocalMaxPrice}
        localMinMetr={localMinMetr}
        localMaxMetr={localMaxMetr}
        setLocalMinMetr={setLocalMinMetr}
        setLocalMaxMetr={setLocalMaxMetr}
        localMinFloor={localMinFloor}
        localMaxFloor={localMaxFloor}
        setLocalMinFloor={setLocalMinFloor}
        setLocalMaxFloor={setLocalMaxFloor}
        localComforts={localComforts}
        setLocalComforts={setLocalComforts}
        setLocalMinPrice={setLocalMinPrice}
        localMinPrice={localMinPrice}
      />
    </div>
  );
};

export default Apartments;
