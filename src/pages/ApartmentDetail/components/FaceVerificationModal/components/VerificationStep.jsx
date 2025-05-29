import React, { useRef, useEffect, useState } from "react";
import { Button, Alert } from "antd";
import axios from "axios";

const VerificationStep = ({
  onNext,
  onBack,
  faceData,
  setFaceData,
  verified,
  setVerified,
}) => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const intervalRef = useRef(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      intervalRef.current = setInterval(captureAndVerify, 4000);
    } catch (err) {
      console.error("Ошибка доступа к камере", err);
      setStatus("Ошибка камеры");
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    clearInterval(intervalRef.current);
  };

  const captureAndVerify = async () => {
    if (loading || verified) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!video || !canvas || !context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/jpeg");

    const payload = new URLSearchParams();
    payload.append("api_key", "fHLyy5HGyQZ5RyH-PqGKMQWFpQE2j6nV");
    payload.append("api_secret", "dgmsTgEAbiUJtC21pdHuJhkvT0PxwzFG");
    payload.append("image_base64", imageData.split(",")[1]);
    payload.append("return_landmark", "1");
    payload.append("return_attributes", "age,gender,emotion");

    setLoading(true);

    try {
      const response = await axios.post(
        "https://api-us.faceplusplus.com/facepp/v3/detect",
        payload,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      const { faces } = response.data;
      if (faces.length > 0) {
        setFaceData(faces[0]);
        setStatus("✅ Лицо распознано");
        setVerified(true);
        clearInterval(intervalRef.current);
      } else {
        setFaceData(null);
        setStatus("❌ Лицо не найдено");
      }
    } catch (error) {
      console.error("Ошибка Face++", error);
      setStatus("Ошибка при распознавании");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <video
        ref={videoRef}
        width="500px"
        autoPlay
        muted
        style={{ borderRadius: 8 }}
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {status && (
        <Alert
          style={{ marginTop: 16 }}
          message={status}
          type={verified ? "success" : "info"}
          showIcon
        />
      )}
      {faceData && (
        <div style={{ marginTop: 16 }}>
          <p>
            <strong>ФИО:</strong> Айжанов Әділ Ерболұлы
          </p>
          <p>
            <strong>Телефон:</strong> +7 776 115 64 16
          </p>
          <p>
            <strong>Дата рождения:</strong> 10.09.2001
          </p>
          <p>
            <strong>ИИН:</strong> 010910550945
          </p>
        </div>
      )}
      <div style={{ marginTop: 24, display: "flex", gap: 8 }}>
        <Button onClick={onBack}>Назад</Button>
        <Button type="primary" disabled={!verified} onClick={onNext} block>
          Продолжить к оплате
        </Button>
      </div>
    </div>
  );
};

export default VerificationStep;
