import { Tag } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

const ApartmentHeader = ({ title, price, location }) => (
  <>
    <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>
      {title} · 42 м² · 10 этаж · посуточно
    </h2>

    <p style={{ marginBottom: 12 }}>
      Квартира с отличным видом, рядом с набережной и ресторанами.
    </p>

    <div style={{ marginBottom: 16 }}>
      <Tag color="blue">1 комн.</Tag>
      <Tag color="green">₸{price.toLocaleString()} / ночь</Tag>
    </div>

    <div style={{ marginBottom: 20, color: "#888" }}>
      <EnvironmentOutlined />{" "}
      {location || "Алматинский р-н, ул. Кошкарбаева 15"}
    </div>
  </>
);

export default ApartmentHeader;
