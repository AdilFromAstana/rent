const apartments = [
  {
    id: 1,
    title: "1-комнатная квартира · 39 м² · 14 этаж · посуточно",
    location: "Есильский р-н, Туран 50/4",
    price: 12000,
    roomsCount: 1,
    description:
      "Жил. комплекс Бухар Жырау, рядом с центром города. Уютная и стильная квартира.",
    images: [
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x201",
    ],
  },
  {
    id: 2,
    title: "1-комнатная квартира · 40 м² · 5/8 этаж · посуточно",
    location: "Есильский р-н, Кабанбай Батыра 586",
    price: 13000,
    roomsCount: 1,
    description:
      "Жил. комплекс Expo Boulevard, 8 этажей. Современный стиль, комфорт и уют.",
    images: [
      "https://via.placeholder.com/300x202",
      "https://via.placeholder.com/300x203",
    ],
  },
  {
    id: 3,
    title: "1-комнатная квартира · 42 м² · 10 этаж · посуточно",
    location: "Алматинский р-н, ул. Кошкарбаева 12",
    price: 11000,
    roomsCount: 1,
    description: "Квартира с отличным видом, рядом с набережной и ресторанами.",
    images: [
      "https://via.placeholder.com/300x204",
      "https://via.placeholder.com/300x205",
    ],
  },
  {
    id: 4,
    title: "2-комнатная квартира · 50 м² · 6 этаж · посуточно",
    location: "Сарыаркинский р-н, ул. Сарыарка 45",
    price: 15000,
    roomsCount: 2,
    description:
      "Просторная квартира, полностью меблирована, есть все удобства.",
    images: [
      "https://via.placeholder.com/300x206",
      "https://via.placeholder.com/300x207",
    ],
  },
  {
    id: 5,
    title: "1-комнатная квартира · 38 м² · 12 этаж · посуточно",
    location: "Есильский р-н, ул. Орынбор 25",
    price: 12500,
    roomsCount: 1,
    description: "Современный ремонт, уютная атмосфера, рядом парк и магазины.",
    images: [
      "https://via.placeholder.com/300x208",
      "https://via.placeholder.com/300x209",
    ],
  },
  {
    id: 6,
    title: "2-комнатная квартира · 60 м² · 9 этаж · посуточно",
    location: "Алматинский р-н, ул. Сарайшык 22",
    price: 16000,
    roomsCount: 2,
    description:
      "Просторная квартира с дизайнерским ремонтом и панорамным видом.",
    images: [
      "https://via.placeholder.com/300x210",
      "https://via.placeholder.com/300x211",
    ],
  },
  {
    id: 7,
    title: "1-комнатная квартира · 36 м² · 7 этаж · посуточно",
    location: "Сарыаркинский р-н, ул. Абая 45",
    price: 11500,
    roomsCount: 1,
    description: "Современная квартира рядом с ТРЦ, удобное расположение.",
    images: [
      "https://via.placeholder.com/300x212",
      "https://via.placeholder.com/300x213",
    ],
  },
  {
    id: 8,
    title: "2-комнатная квартира · 55 м² · 3 этаж · посуточно",
    location: "Есильский р-н, пр. Мангилик Ел 19",
    price: 17000,
    roomsCount: 2,
    description: "Элитные апартаменты с новым ремонтом и всей техникой.",
    images: [
      "https://via.placeholder.com/300x214",
      "https://via.placeholder.com/300x215",
    ],
  },
  {
    id: 9,
    title: "1-комнатная квартира · 35 м² · 5 этаж · посуточно",
    location: "Алматинский р-н, ул. Тауелсиздик 99",
    price: 10500,
    roomsCount: 1,
    description: "Небольшая, но уютная квартира в центре города.",
    images: [
      "https://via.placeholder.com/300x216",
      "https://via.placeholder.com/300x217",
    ],
  },
  {
    id: 10,
    title: "2-комнатная квартира · 58 м² · 11 этаж · посуточно",
    location: "Сарыаркинский р-н, ул. Байтурсынова 44",
    price: 17500,
    roomsCount: 2,
    description:
      "Большая квартира для семьи, современный дизайн, вся мебель новая.",
    images: [
      "https://via.placeholder.com/300x218",
      "https://via.placeholder.com/300x219",
    ],
  },
  {
    id: 11,
    title: "1-комнатная квартира · 41 м² · 8 этаж · посуточно",
    location: "Есильский р-н, ул. Тауелсиздик 55",
    price: 12800,
    roomsCount: 1,
    description: "Уютная квартира с современным ремонтом и панорамными окнами.",
    images: [
      "https://via.placeholder.com/300x220",
      "https://via.placeholder.com/300x221",
    ],
  },
  {
    id: 12,
    title: "2-комнатная квартира · 62 м² · 4 этаж · посуточно",
    location: "Алматинский р-н, ул. Бейбитшилик 33",
    price: 18000,
    roomsCount: 2,
    description: "Просторная квартира в элитном доме, вся техника в наличии.",
    images: [
      "https://via.placeholder.com/300x222",
      "https://via.placeholder.com/300x223",
    ],
  },
  {
    id: 13,
    title: "1-комнатная квартира · 37 м² · 6 этаж · посуточно",
    location: "Сарыаркинский р-н, пр. Кабанбай Батыра 99",
    price: 11800,
    roomsCount: 1,
    description: "Светлая и уютная квартира в новом жилом комплексе.",
    images: [
      "https://via.placeholder.com/300x224",
      "https://via.placeholder.com/300x225",
    ],
  },
  {
    id: 14,
    title: "2-комнатная квартира · 57 м² · 10 этаж · посуточно",
    location: "Есильский р-н, ул. Сыганак 77",
    price: 16500,
    roomsCount: 2,
    description: "Современные апартаменты с дизайнерским интерьером.",
    images: [
      "https://via.placeholder.com/300x226",
      "https://via.placeholder.com/300x227",
    ],
  },
  {
    id: 15,
    title: "1-комнатная квартира · 34 м² · 3 этаж · посуточно",
    location: "Алматинский р-н, ул. Космонавтов 50",
    price: 10800,
    roomsCount: 1,
    description: "Квартира с уютным дизайном и всеми удобствами.",
    images: [
      "https://via.placeholder.com/300x228",
      "https://via.placeholder.com/300x229",
    ],
  },
  {
    id: 16,
    title: "1-комнатная квартира · 33 м² · 2 этаж · посуточно",
    location: "Есильский р-н, ул. Достык 10",
    price: 10200,
    roomsCount: 1,
    description:
      "Компактная и уютная квартира, идеальна для одного человека или пары.",
    images: [
      "https://via.placeholder.com/300x230",
      "https://via.placeholder.com/300x231",
    ],
  },
  {
    id: 17,
    title: "2-комнатная квартира · 64 м² · 12 этаж · посуточно",
    location: "Алматинский р-н, ул. Абай 88",
    price: 18500,
    roomsCount: 2,
    description:
      "Просторная квартира с видом на город, оборудована всей необходимой техникой.",
    images: [
      "https://via.placeholder.com/300x232",
      "https://via.placeholder.com/300x233",
    ],
  },
  {
    id: 18,
    title: "1-комнатная квартира · 38 м² · 4 этаж · посуточно",
    location: "Сарыаркинский р-н, ул. Мира 12",
    price: 11300,
    roomsCount: 1,
    description:
      "Светлая и комфортная квартира, рядом супермаркеты и остановки.",
    images: [
      "https://via.placeholder.com/300x234",
      "https://via.placeholder.com/300x235",
    ],
  },
  {
    id: 19,
    title: "2-комнатная квартира · 59 м² · 7 этаж · посуточно",
    location: "Есильский р-н, пр. Назарбаева 45",
    price: 17500,
    roomsCount: 2,
    description: "Элитная квартира с панорамными окнами и стильным интерьером.",
    images: [
      "https://via.placeholder.com/300x236",
      "https://via.placeholder.com/300x237",
    ],
  },
  {
    id: 20,
    title: "1-комнатная квартира · 36 м² · 6 этаж · посуточно",
    location: "Алматинский р-н, ул. Байконур 27",
    price: 11000,
    roomsCount: 1,
    description:
      "Современная квартира с хорошим ремонтом, удобное расположение.",
    images: [
      "https://via.placeholder.com/300x238",
      "https://via.placeholder.com/300x239",
    ],
  },
];

export default apartments;
