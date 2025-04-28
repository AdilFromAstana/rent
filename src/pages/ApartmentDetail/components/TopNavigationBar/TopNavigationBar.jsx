import { Button } from "antd";
import { LeftOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";

const TopNavigationBar = ({ onBack, isFavorite, toggleFavorite }) => {
  return (
    <div className="top-bar">
      <Button
        icon={<LeftOutlined />}
        size="large"
        shape="circle"
        onClick={onBack}
      />
      <Button
        icon={
          isFavorite ? (
            <HeartFilled style={{ color: "red" }} />
          ) : (
            <HeartOutlined />
          )
        }
        size="large"
        shape="circle"
        onClick={toggleFavorite}
      />
    </div>
  );
};

export default TopNavigationBar;
