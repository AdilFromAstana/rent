import html2pdf from "html2pdf.js";

const generateRentalPdf = async (order) => {
  const { client, checkInDate, checkOutDate, nights, pricePerNight, total } =
    order;

  const htmlContent = `
    <div style="font-family: Arial; padding: 24px; font-size: 14px;">
      <h2 style="text-align: center;">Договор аренды</h2>
      <p>Я, <strong>${client.lastName} ${
    client.firstName
  }</strong>, ИИН <strong>${client.iin}</strong>, телефон <strong>${
    client.phone
  }</strong>, подтверждаю, что ознакомлен с условиями аренды и согласен с ними.</p>
      <p>Квартира бронируется с <strong>${checkInDate}</strong> по <strong>${checkOutDate}</strong> (всего <strong>${nights} ночи</strong>).</p>
      <p>Заезд: <strong>после 14:00</strong>, выезд: <strong>до 12:00</strong>.</p>
      <p>Стоимость: <strong>₸${pricePerNight.toLocaleString()} / ночь</strong>. Всего: <strong>₸${total.toLocaleString()}</strong>.</p>
      <p style="margin-top: 40px;">Подпись клиента: ____________________________</p>
    </div>
  `;

  const element = document.createElement("div");
  element.innerHTML = htmlContent;

  const pdfBlob = await html2pdf()
    .set({
      margin: 10,
      filename: `contract-${Date.now()}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    })
    .from(element)
    .outputPdf("blob");

  return pdfBlob;
};

export default generateRentalPdf;
