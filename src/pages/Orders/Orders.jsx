import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import dayjs from "dayjs";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("orders");
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  const downloadPDF = (order) => {
    const text = `
ДОГОВОР АРЕНДЫ
ФИО: ${order.tenantName}
ИИН: ${order.iin}
Телефон: ${order.phone}
Период аренды: ${order.checkIn} — ${order.checkOut}
Общая сумма: ₸${order.amount.toLocaleString()}
Дата создания: ${dayjs(order.createdAt).format("DD.MM.YYYY HH:mm")}
Подписано ЭЦП
    `;

    const blob = new Blob([text], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Договор_${order.id}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const columns = [
    {
      title: "ФИО",
      dataIndex: "tenantName",
      key: "tenantName",
    },
    {
      title: "Телефон",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "ИИН",
      dataIndex: "iin",
      key: "iin",
    },
    {
      title: "Период",
      key: "period",
      render: (_, record) => `${record.checkIn} — ${record.checkOut}`,
    },
    {
      title: "Сумма",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `₸${amount.toLocaleString()}`,
    },
    {
      title: "Дата",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => dayjs(createdAt).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Действие",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => downloadPDF(record)}>
          Скачать PDF
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Список заказов</h1>
      <Table
        dataSource={orders.map((o) => ({ ...o, key: o.id }))}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default Orders;
