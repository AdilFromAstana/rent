import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import dayjs from "dayjs";
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.default.vfs;

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("orders");
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  const downloadPDF = (order) => {
    const landlordSignatureText = isSignedByLandlord
      ? "Подписано ЭЦП"
      : "Подпись: ____________";
    const tenantSignatureText = isSignedByTenant
      ? "Подписано ЭЦП"
      : "Подпись: ____________";

    const docDefinition = {
      content: [
        {
          text: "ДОГОВОР ПОСУТОЧНОГО НАЙМА КВАРТИРЫ",
          style: "title",
          alignment: "center",
          margin: [0, 0, 0, 20],
        },

        { text: `г. Астана`, alignment: "right" },
        {
          text: `«${dayjs(order.createdAt).format("DD")}» ${dayjs(
            order.createdAt
          ).format("MMMM")} ${dayjs(order.createdAt).format("YYYY")} г.`,
          alignment: "right",
          margin: [0, 0, 0, 20],
        },

        {
          text: `Мы, нижеподписавшиеся, гражданин Иванов Иван Иванович, проживающий по адресу г. Астана, ул. Примерная, д. 1, паспорт серии AB №123456, выдан «01» января 2020 г. МВД РК, именуемый в дальнейшем «Наймодатель», с одной стороны, и гражданин ${order.tenantName}, проживающий по адресу: г. Астана, _______________________, ИИН: ${order.iin}, телефон: ${order.phone}, именуемый в дальнейшем «Наниматель», с другой стороны, заключили настоящий договор о нижеследующем:\n`,
          margin: [0, 0, 0, 15],
        },

        { text: "1. ПРЕДМЕТ ДОГОВОРА", style: "section" },
        {
          text: `1.1 Наймодатель предоставляет, а Наниматель принимает во временное платное пользование однокомнатную квартиру по адресу: ${
            order.apartmentAddress || "__________"
          }.`,
        },
        {
          text: `1.2 Квартира предоставляется на срок с ${order.checkIn} по ${order.checkOut}.`,
        },
        {
          text: "1.3 Право собственности Наймодателя подтверждено соответствующими документами, предоставленными при подписании договора.",
        },
        {
          text: "1.4 В квартире находится имущество, перечень которого указан в Акте приёма-передачи.",
        },

        {
          text: "2. АРЕНДНАЯ ПЛАТА И РАСЧЕТЫ",
          style: "section",
          margin: [0, 10, 0, 0],
        },
        {
          text: `2.1 Арендная плата составляет ₸${order.total.toLocaleString()} за весь срок проживания.`,
        },
        {
          text: "2.2 Оплата производится авансом наличным или безналичным способом в день подписания договора.",
        },
        {
          text: "2.3 В стоимость аренды включены коммунальные услуги, за исключением: —.",
        },
        {
          text: "2.4 При позднем выезде Наниматель обязуется доплатить за дополнительные сутки.",
        },
        {
          text: "2.5 При заселении может быть внесён депозит в размере стоимости суток проживания. Возвращается при выселении, если имущество не повреждено.",
        },

        { text: "3. ПРАВА И ОБЯЗАННОСТИ СТОРОН", style: "section" },
        {
          ul: [
            "Наймодатель обязуется предоставить квартиру в пригодном для проживания состоянии, укомплектованную мебелью и техникой.",
            "Передать ключи и провести первичный осмотр квартиры с Нанимателем.",
            "Наниматель обязуется использовать жильё по назначению — только для проживания.",
            "Соблюдать санитарные нормы, правила пользования жилыми помещениями и не нарушать покой соседей.",
            "Беречь имущество, не выносить его без разрешения Наймодателя.",
            "Возвратить квартиру и ключи в день выезда, с подписанием Акта приёма-передачи.",
            "Сообщать Наймодателю о поломках и авариях незамедлительно.",
          ],
        },

        { text: "4. ПРОЖИВАНИЕ ТРЕТЬИХ ЛИЦ", style: "section" },
        {
          text: "4.1 В квартире могут проживать третьи лица только по согласованию с Наймодателем.",
        },

        { text: "5. ПЕРЕДАЧА И ВОЗВРАТ КВАРТИРЫ", style: "section" },
        {
          ul: [
            "Передача квартиры сопровождается Актом приёма-передачи.",
            "Фиксируется состояние квартиры, мебели и техники.",
            "При возврате ключей составляется аналогичный акт.",
            "Все претензии по состоянию фиксируются на момент въезда.",
          ],
        },

        { text: "6. ОТВЕТСТВЕННОСТЬ СТОРОН", style: "section" },
        {
          ul: [
            "За порчу имущества Наниматель несёт материальную ответственность.",
            "При нанесении ущерба — возмещение убытков в полном объёме.",
            "Споры решаются путём переговоров, а при необходимости — в судебном порядке по месту нахождения квартиры.",
          ],
        },

        { text: "7. ПРОЧИЕ УСЛОВИЯ", style: "section", margin: [0, 10, 0, 0] },
        {
          ul: [
            "Настоящий договор вступает в силу с момента его подписания обеими Сторонами.",
            "Продление срока аренды возможно по письменному соглашению.",
            "Договор составлен в двух экземплярах, по одному для каждой стороны.",
            "Приложением к настоящему договору является Акт приёма-сдачи помещения.",
            "Настоящий договор подписан обеими Сторонами с использованием электронной цифровой подписи (ЭЦП), что приравнивается к собственноручной подписи в соответствии с законодательством.",
          ],
        },
        {
          columns: [
            {
              width: "50%",
              text: [
                { text: "Наймодатель:\n\n", bold: true },
                `${landlordSignatureText}\n`,
                "ФИО: Иванов Иван Иванович\n",
              ],
            },
            {
              width: "50%",
              text: [
                { text: "Наниматель:\n\n", bold: true },
                `${tenantSignatureText}\n`,
                `ФИО: ${order.tenantName}\n`,
                `ИИН: ${order.iin}\n`,
                `Телефон: ${order.phone}\n`,
              ],
            },
          ],
          margin: [0, 20, 0, 0],
        },
      ],
      styles: {
        title: { fontSize: 16, bold: true },
        section: { fontSize: 13, bold: true, margin: [0, 10, 0, 3] },
      },
      defaultStyle: {
        font: "Roboto",
        fontSize: 11,
      },
    };

    pdfMake.createPdf(docDefinition).download(`Договор_${order.id}.pdf`);
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
      dataIndex: "total",
      key: "total",
      render: (total) => `₸${total.toLocaleString()}`,
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
