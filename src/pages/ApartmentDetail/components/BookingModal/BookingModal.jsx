import {
  Modal,
  Form,
  Input,
  Button,
  message,
  DatePicker,
  InputNumber,
  Switch,
} from "antd";
import { useState } from "react";
import dayjs from "dayjs";

export default function BookingModal({
  open,
  onClose,
  apartmentPrice,
  rentalDays,
  selectedDates,
}) {
  const [step, setStep] = useState(1);
  const [bookingInfo, setBookingInfo] = useState({
    guests: 1,
    hasPets: false,
    name: "",
    phone: "",
  });

  const [messageApi, contextHolder] = message.useMessage();

  const handleNext = () => {
    if (step === 1 && (!bookingInfo.guests || bookingInfo.guests < 1)) {
      messageApi.error("Укажите количество гостей");
      return;
    }
    if (step === 2 && (!bookingInfo.name || !bookingInfo.phone)) {
      messageApi.error("Пожалуйста, заполните все личные данные");
      return;
    }
    if (step === 3) {
      messageApi.success("Бронирование успешно завершено!");
      setTimeout(() => {
        onClose();
        setStep(1);
        setBookingInfo({
          guests: 1,
          hasPets: false,
          name: "",
          phone: "",
        });
      }, 1500);
    } else {
      setStep(step + 1);
    }
  };

  const totalPrice =
    rentalDays > 0 ? rentalDays * apartmentPrice : apartmentPrice;

  return (
    <>
      {contextHolder}
      <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        title={
          step === 1
            ? "Подтверждение данных"
            : step === 2
            ? "Введите личные данные"
            : "Оплата бронирования"
        }
      >
        {step === 1 && (
          <Form layout="vertical">
            <Form.Item label="Выбранные даты">
              <DatePicker.RangePicker
                style={{ width: "100%" }}
                value={selectedDates.map((date) => dayjs(date))}
                disabled
              />
            </Form.Item>
            <Form.Item label="Количество гостей">
              <InputNumber
                min={1}
                max={10}
                value={bookingInfo.guests}
                onChange={(value) =>
                  setBookingInfo((prev) => ({
                    ...prev,
                    guests: value,
                  }))
                }
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="Есть ли с вами питомцы?">
              <Switch
                checked={bookingInfo.hasPets}
                onChange={(checked) =>
                  setBookingInfo((prev) => ({
                    ...prev,
                    hasPets: checked,
                  }))
                }
              />
            </Form.Item>
          </Form>
        )}
        {step === 2 && (
          <Form layout="vertical">
            <Form.Item label="Имя">
              <Input
                value={bookingInfo.name}
                onChange={(e) =>
                  setBookingInfo((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </Form.Item>
            <Form.Item label="Телефон">
              <Input
                value={bookingInfo.phone}
                onChange={(e) =>
                  setBookingInfo((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
              />
            </Form.Item>
          </Form>
        )}
        {step === 3 && (
          <div style={{ textAlign: "center" }}>
            <p>
              Сумма к оплате: {totalPrice} ₸ за{" "}
              {rentalDays > 0 ? `${rentalDays} ночей` : "ночь"}
            </p>
            <Button type="primary" onClick={handleNext}>
              Оплатить и забронировать
            </Button>
          </div>
        )}
        {step !== 3 && (
          <Button
            type="primary"
            style={{ marginTop: 16 }}
            block
            onClick={handleNext}
          >
            Далее
          </Button>
        )}
      </Modal>
    </>
  );
}
