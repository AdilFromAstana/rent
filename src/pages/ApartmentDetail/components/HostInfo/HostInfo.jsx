import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const HostInfo = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 16,
    }}
  >
    <Avatar size={48} icon={<UserOutlined />} />
    <div>
      <div style={{ fontWeight: 500 }}>Анара</div>
      <div style={{ fontSize: 12, color: "#888" }}>
        Суперхозяин · 9 месяцев на платформе
      </div>
    </div>
  </div>
);

export default HostInfo;
