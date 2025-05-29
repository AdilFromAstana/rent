import React, { useState } from "react";
import { Modal, Steps } from "antd";
import AgreementStep from "./components/AgreementStep";
import VerificationStep from "./components/VerificationStep";
import PaymentStep from "./components/PaymentStep";
import ConfirmationStep from "./components/ConfirmationStep";
import ClientFormStep from "./components/ClientFormStep";
import dayjs from "dayjs";
import { useFilters } from "../../../../context/FilterContext";

const { Step } = Steps;

const FaceVerificationModal = ({ open, onCancel, onSuccess, apartment }) => {
  const [step, setStep] = useState(1);
  const [faceData, setFaceData] = useState(null);
  const [verified, setVerified] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("kaspi");
  const [clientData, setClientData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const { selectedDates } = useFilters();

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const nights = dayjs(selectedDates[1]).diff(dayjs(selectedDates[0]), "day");
  const total = nights * apartment.price;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ClientFormStep
            onSubmit={(data) => {
              setClientData(data);
              nextStep();
            }}
          />
        );
      case 2:
        return (
          <AgreementStep
            onNext={() => {
              setOrderData({
                phone: clientData.phone,
                checkIn: dayjs(selectedDates[0]).format("YYYY-MM-DD"),
                checkOut: dayjs(selectedDates[1]).format("YYYY-MM-DD"),
                nights,
                total,
                pdfUrl: "", // если будет сгенерирован PDF, подставь сюда путь
              });
              nextStep();
            }}
            onBack={prevStep}
            clientData={clientData}
            checkInDate={dayjs(selectedDates[0]).format("DD.MM.YYYY")}
            checkOutDate={dayjs(selectedDates[1]).format("DD.MM.YYYY")}
            nights={nights}
            pricePerNight={apartment.price}
          />
        );
      case 3:
        return (
          <VerificationStep
            onNext={nextStep}
            onBack={prevStep}
            faceData={faceData}
            setFaceData={setFaceData}
            verified={verified}
            setVerified={setVerified}
          />
        );
      case 4:
        return (
          <PaymentStep
            onNext={nextStep}
            onBack={prevStep}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        );
      case 5:
        return (
          <ConfirmationStep
            clientData={clientData}
            orderData={{
              ...orderData,
              id: Date.now(),
              createdAt: new Date().toISOString(),
              clientName: `${clientData.firstName} ${clientData.lastName}`,
              paymentMethod,
            }}
            onBack={prevStep}
            onSuccess={onSuccess}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      width="50vw"
      open={open}
      onCancel={onCancel}
      footer={null}
      title="Бронирование квартиры"
      destroyOnClose
    >
      <Steps current={step - 1} size="small" style={{ marginBottom: 24 }}>
        <Step title="Данные" />
        <Step title="Договор" />
        <Step title="Верификация" />
        <Step title="Оплата" />
        <Step title="Подтверждение" />
      </Steps>
      {renderStep()}
    </Modal>
  );
};

export default FaceVerificationModal;
