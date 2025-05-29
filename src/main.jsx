import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { FilterProvider } from "./context/FilterContext";
import { ConfigProvider } from "antd";
import ruRU from "antd/locale/ru_RU";
import App from "./App";
import "./index.css";
import dayjs from "dayjs";
import "dayjs/locale/ru";

dayjs.locale("ru");

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider locale={ruRU}>
    <BrowserRouter>
      <FilterProvider>
        <App />
      </FilterProvider>
    </BrowserRouter>
  </ConfigProvider>
);
