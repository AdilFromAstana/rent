import { Button, Typography } from "antd";

const { Title, Paragraph } = Typography;

const saveOrderToLocalStorage = (newOrder) => {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));
};

const ConfirmationStep = ({ onBack, onSuccess, clientData, orderData }) => {
  const handleFinish = () => {
    const fullOrder = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      tenantName: `${clientData.firstName} ${clientData.lastName}`,
      iin: clientData.iin,
      phone: clientData.phone,
      checkIn: orderData.checkIn,
      checkOut: orderData.checkOut,
      nights: orderData.nights,
      total: orderData.total,
      paymentMethod: orderData.paymentMethod,
      pdfUrl: orderData.pdfUrl || "",
    };

    saveOrderToLocalStorage(fullOrder);
    onSuccess();
  };

  return (
    <div>
      <Title level={4}>Готово!</Title>
      <Paragraph>
        Ваше бронирование подтверждено. Подробности отправлены на ваш телефон.
      </Paragraph>
      <div style={{ marginTop: 24, display: "flex", gap: 8 }}>
        <Button onClick={onBack}>Назад</Button>
        <Button type="primary" onClick={handleFinish} block>
          Завершить
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
