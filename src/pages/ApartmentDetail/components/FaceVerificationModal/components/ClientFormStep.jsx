import React, { useState } from "react";
import { Form, Input, Button } from "antd";

const ClientForm = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values); // передаём данные наверх
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      style={{ maxWidth: 400, margin: "0 auto" }}
    >
      <Form.Item
        label="Имя"
        name="firstName"
        rules={[{ required: true, message: "Введите имя" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Фамилия"
        name="lastName"
        rules={[{ required: true, message: "Введите фамилию" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Номер телефона"
        name="phone"
        rules={[
          { required: true, message: "Введите номер телефона" },
          {
            pattern: /^\+7\d{10}$/,
            message: "Введите номер в формате +7XXXXXXXXXX",
          },
        ]}
      >
        <Input placeholder="+7XXXXXXXXXX" />
      </Form.Item>

      <Form.Item
        label="ИИН"
        name="iin"
        rules={[
          { required: true, message: "Введите ИИН" },
          {
            pattern: /^\d{12}$/,
            message: "ИИН должен содержать 12 цифр",
          },
        ]}
      >
        <Input maxLength={12} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ClientForm;
