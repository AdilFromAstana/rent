import React from "react";
import { Button, Typography } from "antd";

const { Paragraph } = Typography;

const PaymentStep = ({ onNext, onBack, paymentMethod, setPaymentMethod }) => {
  const nights = 2;
  const pricePerNight = 7500;
  const total = nights * pricePerNight;
  const totalFormatted = total.toLocaleString();

  return (
    <div>
      <h4>Оплата</h4>
      <Paragraph>Сумма к оплате: ₸{totalFormatted}</Paragraph>

      <div style={{ marginBottom: 16 }}>
        <Button
          type={paymentMethod === "kaspi" ? "primary" : "default"}
          onClick={() => setPaymentMethod("kaspi")}
          style={{ marginRight: 8 }}
        >
          Kaspi QR
        </Button>
        <Button
          type={paymentMethod === "card" ? "primary" : "default"}
          onClick={() => setPaymentMethod("card")}
        >
          Банковская карта
        </Button>
      </div>

      {paymentMethod === "kaspi" && (
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <img
            src="https://f.nodacdn.net/408120"
            alt="Kaspi QR"
            style={{ width: 200, height: 200, marginBottom: 8 }}
          />
          <Paragraph>Отсканируйте QR в приложении Kaspi</Paragraph>
        </div>
      )}

      {paymentMethod === "card" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <input
            type="text"
            placeholder="Номер карты"
            maxLength={19}
            style={{
              padding: 8,
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              placeholder="MM/YY"
              maxLength={5}
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 6,
                border: "1px solid #ccc",
              }}
            />
            <input
              type="text"
              placeholder="CVV"
              maxLength={3}
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 6,
                border: "1px solid #ccc",
              }}
            />
          </div>
        </div>
      )}

      <div style={{ marginTop: 24, display: "flex", gap: 8 }}>
        <Button onClick={onBack}>Назад</Button>
        <Button type="primary" onClick={onNext} block>
          Оплатить и продолжить
        </Button>
      </div>
    </div>
  );
};

export default PaymentStep;
