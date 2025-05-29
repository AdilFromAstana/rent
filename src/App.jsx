import ApartmentDetail from "./pages/ApartmentDetail/ApartmentDetail";
import Apartments from "./pages/Apartments/Apartments";
import Orders from "./pages/Orders/Orders";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <header className="app-header">
        <div className="logo">🏠 Квартиры</div>
        <nav className="nav-links">
          <Link to="/">Главная</Link>
          <Link to="/orders">Бронирования</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Apartments />} />
        <Route path="/apartment/:id" element={<ApartmentDetail />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
