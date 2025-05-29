import React from "react";
import { List, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const ReviewsList = () => (
  <List
    size="small"
    dataSource={[
      {
        name: "Ирина",
        text: "Очень уютная квартира, всё как на фото!",
      },
      {
        name: "Ержан",
        text: "Чисто, удобно, хорошее местоположение.",
      },
    ]}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar icon={<UserOutlined />} />}
          title={<span>{item.name}</span>}
          description={item.text}
        />
      </List.Item>
    )}
  />
);

export default ReviewsList;
