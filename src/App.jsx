import { Route, Routes } from "react-router-dom";
import "./App.css";
import ApartmentDetail from "./pages/ApartmentDetail/ApartmentDetail";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/apartment/:id" element={<ApartmentDetail />} />
    </Routes>
  );
}

export default App;
