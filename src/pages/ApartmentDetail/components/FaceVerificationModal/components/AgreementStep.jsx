import { Button, Typography, Divider } from "antd";

const { Title, Paragraph } = Typography;

const AgreementStep = ({
  onNext,
  onBack,
  clientData,
  checkInDate,
  checkOutDate,
  nights,
  pricePerNight,
}) => {
  const total = nights * pricePerNight;

  return (
    <div>
      <Title level={4}>Договор аренды</Title>
      <Paragraph>
        Я, <strong>{`${clientData.lastName} ${clientData.firstName}`}</strong>,
        ИИН <strong>{clientData.iin}</strong>, телефон{" "}
        <strong>{clientData.phone}</strong>, подтверждаю, что ознакомлен с
        условиями аренды и согласен с ними.
      </Paragraph>
      <Paragraph>
        Квартира бронируется с <strong>{checkInDate}</strong> по{" "}
        <strong>{checkOutDate}</strong> (всего <strong>{nights} ночи</strong>).
        <br />
        Заезд: <strong>после 14:00</strong>, выезд: <strong>до 12:00</strong>.
      </Paragraph>
      <Paragraph>
        Стоимость аренды:{" "}
        <strong>₸{pricePerNight.toLocaleString()} / ночь</strong>. Общая сумма:{" "}
        <strong>₸{total.toLocaleString()}</strong>.
      </Paragraph>
      <Divider />
      <div style={{ marginTop: 24, display: "flex", gap: 8 }}>
        <Button onClick={onBack}>Назад</Button>
        <Button type="primary" onClick={onNext} block>
          Подписать договор и продолжить
        </Button>
      </div>
    </div>
  );
};

export default AgreementStep;
