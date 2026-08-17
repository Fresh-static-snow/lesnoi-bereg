export type Room = {
  slug: string;
  name: string;
  type: string;
  image: string;
  gallery: string[];
  price: number;
  oldPrice?: number;
  guests: number;
  area: number;
  beds: string;
  bedrooms: number;
  badges: string[];
  amenities: string[];
  summary: string;
  description: string;
};

const images = {
  forest: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2200&q=88",
  cabin: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1600&q=86",
  chalet: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1600&q=86",
  villa: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=86",
  interior: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=86",
  bedroom: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=86",
  cottage: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1600&q=86",
  house: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1600&q=86",
  pool: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1600&q=86",
  spa: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=86",
  sauna: "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&w=1600&q=86",
  restaurant: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=86",
  food: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1600&q=86",
  massage: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1600&q=86",
  fire: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?auto=format&fit=crop&w=1600&q=86",
};

export const heroImage = images.forest;

export const rooms: Room[] = [
  {
    slug: "sosnovyi",
    name: "Домик «Сосновый»",
    type: "Домик",
    image: images.cabin,
    gallery: [images.cabin, images.interior, images.bedroom, images.forest],
    price: 4200,
    oldPrice: 4700,
    guests: 2,
    area: 32,
    beds: "1 двуспальная",
    bedrooms: 1,
    badges: ["Популярный", "Для двоих"],
    amenities: ["Панорамные окна", "Терраса", "Мини-кухня", "Кондиционер", "Wi-Fi", "Тёплый пол"],
    summary: "Камерный деревянный домик для тихого отдыха вдвоём.",
    description: "Светлый домик среди сосен с панорамным окном, собственной террасой и мягким светом. Утром здесь слышно птиц, а вечером можно укутаться в плед и смотреть на лес.",
  },
  {
    slug: "tikhoe-ozero",
    name: "Шале «Тихое озеро»",
    type: "Шале",
    image: images.chalet,
    gallery: [images.chalet, images.bedroom, images.interior, images.forest],
    price: 6800,
    guests: 4,
    area: 58,
    beds: "2 двуспальные",
    bedrooms: 2,
    badges: ["У озера", "Для семьи"],
    amenities: ["Вид на озеро", "Камин", "Кухня", "Терраса", "Wi-Fi", "Детская кроватка"],
    summary: "Семейное шале у воды с камином и просторной террасой.",
    description: "Две отдельные спальни, гостиная с камином и терраса прямо у воды. Пространство создано для спокойных семейных завтраков и долгих разговоров у огня.",
  },
  {
    slug: "villa-pool",
    name: "Вилла с бассейном",
    type: "Вилла",
    image: images.villa,
    gallery: [images.villa, images.pool, images.interior, images.restaurant],
    price: 11500,
    oldPrice: 12900,
    guests: 6,
    area: 96,
    beds: "3 двуспальные",
    bedrooms: 3,
    badges: ["С бассейном", "Премиум"],
    amenities: ["Частный бассейн", "3 спальни", "Камин", "Кухня", "Гриль-зона", "Парковка"],
    summary: "Приватная вилла для компании с собственным тёплым бассейном.",
    description: "Самый просторный вариант комплекса: три спальни, большая гостиная, личная гриль-зона и подогреваемый бассейн. Для выходных, которые хочется запомнить.",
  },
  {
    slug: "berezovyi",
    name: "Домик «Берёзовый»",
    type: "Домик",
    image: images.cottage,
    gallery: [images.cottage, images.interior, images.food, images.forest],
    price: 4900,
    guests: 3,
    area: 40,
    beds: "1 двуспальная + диван",
    bedrooms: 1,
    badges: ["Новый", "Pet friendly"],
    amenities: ["Терраса", "Мини-кухня", "Гамак", "Wi-Fi", "Для животных", "Кондиционер"],
    summary: "Тёплый домик с гамаком и отдельным местом для питомца.",
    description: "Уютный домик в светлой части леса. Здесь есть терраса с гамаком, удобная мини-кухня и всё необходимое для отдыха с небольшим питомцем.",
  },
  {
    slug: "dubovyi",
    name: "Коттедж «Дубовый»",
    type: "Коттедж",
    image: images.house,
    gallery: [images.house, images.bedroom, images.fire, images.forest],
    price: 7900,
    guests: 5,
    area: 72,
    beds: "2 двуспальные + диван",
    bedrooms: 2,
    badges: ["Для семьи", "С камином"],
    amenities: ["Камин", "2 спальни", "Кухня", "Ванна", "Мангал", "Парковка"],
    summary: "Просторный коттедж с настоящим камином и видом на дубовую рощу.",
    description: "Дом для семейного отдыха с двумя спальнями, большой кухней и камином. Рядом — отдельная мангальная зона и короткая тропа к озеру.",
  },
  {
    slug: "panorama",
    name: "Студия «Панорама»",
    type: "Студия",
    image: images.bedroom,
    gallery: [images.bedroom, images.interior, images.spa, images.forest],
    price: 3600,
    guests: 2,
    area: 28,
    beds: "1 двуспальная",
    bedrooms: 1,
    badges: ["Вид на лес"],
    amenities: ["Панорамное окно", "Кофемашина", "Wi-Fi", "Кондиционер", "Халаты", "Room service"],
    summary: "Минималистичная студия с окном во всю стену.",
    description: "Небольшая, но продуманная до мелочей студия. Главный акцент — панорамное окно с видом на сосны и мягкая кровать у самого леса.",
  },
];

export const services = [
  { name: "Тёплый бассейн", category: "Бассейн", price: 650, unit: "за человека", duration: "3 часа", booking: false, image: images.pool, description: "Открытый бассейн с температурой воды 29°C и зоной отдыха среди сосен." },
  { name: "SPA-ритуал «Лес»", category: "SPA", price: 2200, unit: "за сеанс", duration: "90 минут", booking: true, image: images.spa, description: "Парение, пилинг с лесными травами и расслабление с ароматным чаем." },
  { name: "Расслабляющий массаж", category: "Массаж", price: 1400, unit: "за сеанс", duration: "60 минут", booking: true, image: images.massage, description: "Мягкая техника для снятия напряжения после активного дня." },
  { name: "Баня на дровах", category: "Баня и сауна", price: 1800, unit: "за час", duration: "от 2 часов", booking: true, image: images.sauna, description: "Приватная баня у озера, дубовые веники и купель с прохладной водой." },
  { name: "Завтрак в домик", category: "Ресторан", price: 520, unit: "за человека", duration: "08:00–11:00", booking: false, image: images.food, description: "Горячий завтрак, сезонные фрукты, выпечка и напиток на выбор." },
  { name: "Ужин от шефа", category: "Ресторан", price: 1250, unit: "за человека", duration: "2 часа", booking: true, image: images.restaurant, description: "Сет из четырёх блюд локальной кухни с сезонными продуктами." },
  { name: "Аренда беседки", category: "Отдых", price: 1600, unit: "за день", duration: "до 22:00", booking: true, image: images.fire, description: "Крытая беседка у воды для компании до 10 гостей." },
  { name: "Мангал и дрова", category: "Отдых", price: 450, unit: "за услугу", duration: "1 день", booking: false, image: images.fire, description: "Подготовленный мангал, шампуры, решётка и корзина сухих дров." },
  { name: "Романтический декор", category: "События", price: 2400, unit: "за услугу", duration: "к заезду", booking: true, image: images.interior, description: "Свечи, лепестки, цветы, десерт и игристое к вашему приезду." },
  { name: "Поздний выезд", category: "Комфорт", price: 900, unit: "за услугу", duration: "до 18:00", booking: true, image: images.cabin, description: "Останьтесь подольше, если номер свободен в день выезда." },
];

export const testimonials = [
  { quote: "Здесь впервые за долгое время не хотелось смотреть на часы. Домик очень тёплый, тишина настоящая, а завтрак — отдельная любовь.", name: "Марина и Алексей", stay: "Домик «Сосновый», май 2026" },
  { quote: "Бассейн среди сосен выглядит ещё лучше, чем на фото. Персонал бережный и ненавязчивый — именно тот уровень сервиса, который мы искали.", name: "Ольга", stay: "Вилла с бассейном, июнь 2026" },
  { quote: "Приезжали с детьми и собакой. Всем нашлось место и занятие, а вечером сидели у камина. Уже забронировали осенние выходные.", name: "Семья Коваленко", stay: "Коттедж «Дубовый», апрель 2026" },
];

export const policies: Record<string, { title: string; intro: string; sections: { title: string; text: string }[] }> = {
  privacy: { title: "Политика конфиденциальности", intro: "Мы бережно относимся к персональным данным гостей и используем их только для обработки обращений и бронирований.", sections: [
    { title: "Какие данные мы получаем", text: "Имя, контактный телефон, email, сведения о составе гостей, комментарий к бронированию и технические данные, необходимые для работы сайта." },
    { title: "Для чего используются данные", text: "Для подтверждения бронирования, связи с гостем, предоставления выбранных услуг, выполнения требований законодательства и улучшения качества сервиса." },
    { title: "Хранение и защита", text: "Доступ к данным имеют только уполномоченные сотрудники. Мы применяем организационные и технические меры защиты и не передаём сведения третьим лицам без законного основания." },
  ]},
  booking: { title: "Условия бронирования", intro: "Заявка становится подтверждённым бронированием после связи с менеджером и внесения согласованной предоплаты.", sections: [
    { title: "Подтверждение", text: "После отправки заявки менеджер проверит доступность, уточнит детали и направит реквизиты для предоплаты. До этого момента заявка имеет статус ожидания." },
    { title: "Оплата", text: "Размер предоплаты обычно составляет 50% стоимости проживания. Остаток оплачивается до заселения удобным согласованным способом." },
  ]},
  cancellation: { title: "Отмена и возврат", intro: "Условия возврата зависят от срока уведомления и индивидуальных условий тарифа.", sections: [
    { title: "Более 7 суток", text: "При отмене не позднее чем за 7 суток до заезда предоплата возвращается в полном объёме за вычетом фактических банковских комиссий." },
    { title: "Менее 7 суток", text: "Предоплата может быть удержана или перенесена на другие даты по согласованию с комплексом." },
  ]},
  consent: { title: "Согласие на обработку данных", intro: "Отправляя форму, гость добровольно предоставляет данные для выполнения запроса на бронирование.", sections: [
    { title: "Объём согласия", text: "Согласие распространяется на сбор, систематизацию, хранение, уточнение и использование данных для целей обслуживания гостя." },
    { title: "Отзыв согласия", text: "Согласие можно отозвать письменным обращением на email комплекса, если дальнейшее хранение не требуется по закону." },
  ]},
  offer: { title: "Публичная оферта", intro: "Этот демонстрационный документ описывает общие условия предоставления услуг размещения и отдыха.", sections: [
    { title: "Предмет", text: "Комплекс предоставляет услуги временного проживания и дополнительные услуги согласно подтверждённому бронированию, а гость принимает и оплачивает их." },
    { title: "Права и обязанности", text: "Комплекс обязуется предоставить чистый и исправный номер, а гость — соблюдать правила проживания, сроки оплаты и бережно относиться к имуществу." },
  ]},
};

export const formatMoney = (value: number) => new Intl.NumberFormat("uk-UA").format(value) + " ₴";
