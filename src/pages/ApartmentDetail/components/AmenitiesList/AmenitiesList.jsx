import { Tag } from "antd";
import {
  WifiOutlined,
  DesktopOutlined,
  CarOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const AmenitiesList = () => (
  <div className="amenities">
    <Tag icon={<WifiOutlined />}>Wi-Fi</Tag>
    <Tag icon={<DesktopOutlined />}>Телевизор</Tag>
    <Tag icon={<CarOutlined />}>Бесплатная парковка</Tag>
    <Tag icon={<HomeOutlined />}>Кондиционер</Tag>
  </div>
);

export default AmenitiesList;
