import ApartmentDetail from "./pages/ApartmentDetail/ApartmentDetail";
import Apartments from "./pages/Apartments/Apartments";
import Orders from "./pages/Orders/Orders";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Apartments />} />
      <Route path="/apartment/:id" element={<ApartmentDetail />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
