"use client";

import { useEffect, useMemo, useState } from "react";
import { formatMoney, heroImage, policies, rooms, services, testimonials, type Room } from "../../lib/site-data";

type View = "home" | "rooms" | "room" | "services" | "gallery" | "contacts" | "rules" | "policy" | "booking";

const icons: Record<string, string> = {
  pool: "≈",
  spa: "✦",
  sauna: "♨",
  food: "◇",
  parking: "P",
  fire: "⌁",
};

function Header({ solid = false }: { solid?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={`site-header ${solid ? "header-solid" : ""}`}>
      <a className="brand" href="/" aria-label="Лесной берег — на главную">
        <span className="brand-mark">ЛБ</span>
        <span>Лесной берег<small>загородный комплекс</small></span>
      </a>
      <nav aria-label="Основная навигация">
        <a href="/rooms">Номера</a><a href="/services">Услуги</a><a href="/gallery">Галерея</a><a href="/contacts">Контакты</a>
      </nav>
      <a className="button button-light header-book" href="/booking">Забронировать</a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Открыть меню"><span /><span /></button>
      {open && <div className="mobile-menu"><a href="/rooms">Номера</a><a href="/services">Услуги и цены</a><a href="/gallery">Галерея</a><a href="/contacts">Контакты</a><a href="/rules">Правила пребывания</a><a className="button button-primary" href="/booking">Забронировать</a></div>}
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer" id="contacts">
      <div className="footer-top">
        <div><a className="brand footer-brand" href="/"><span className="brand-mark">ЛБ</span><span>Лесной берег<small>загородный комплекс</small></span></a><p>Тишина, природа и забота — в 45 минутах от Киева.</p></div>
        <div><h4>Комплекс</h4><a href="/rooms">Номера</a><a href="/services">Услуги и цены</a><a href="/gallery">Галерея</a><a href="/rules">Правила пребывания</a></div>
        <div><h4>Контакты</h4><a href="tel:+380671234567">+38 (067) 123-45-67</a><a href="mailto:hello@lisnyi-bereg.ua">hello@lisnyi-bereg.ua</a><span>Киевская обл., с. Лесное<br />ул. Озёрная, 12</span></div>
        <div><h4>Мы на связи</h4><a href="#">Instagram ↗</a><a href="#">Facebook ↗</a><a href="#">Telegram ↗</a></div>
      </div>
      <div className="footer-bottom"><span>© 2026 «Лесной берег»</span><div><a href="/policies/privacy">Конфиденциальность</a><a href="/policies/booking">Условия бронирования</a><a href="/policies/offer">Оферта</a></div><a href="/admin">Для администратора</a></div>
    </footer>
  );
}

function SearchBar({ compact = false }: { compact?: boolean }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const search = () => {
    const params = new URLSearchParams({ checkIn, checkOut, guests });
    window.location.href = `/booking?${params.toString()}`;
  };
  return (
    <section className={`search-panel ${compact ? "search-compact" : ""}`} aria-label="Поиск свободных номеров">
      <label><span>Заезд</span><input value={checkIn} min={new Date().toISOString().slice(0, 10)} onChange={e => setCheckIn(e.target.value)} type="date" aria-label="Дата заезда" /></label>
      <label><span>Выезд</span><input value={checkOut} min={checkIn || new Date().toISOString().slice(0, 10)} onChange={e => setCheckOut(e.target.value)} type="date" aria-label="Дата выезда" /></label>
      <label><span>Гости</span><select value={guests} onChange={e => setGuests(e.target.value)} aria-label="Количество гостей"><option value="1">1 гость</option><option value="2">2 гостя</option><option value="3">3 гостя</option><option value="4">4 гостя</option><option value="6">5–6 гостей</option></select></label>
      <button className="button button-dark" onClick={search} type="button">Найти домик</button>
    </section>
  );
}

function RoomCard({ room }: { room: Room }) {
  return (
    <article className="room-card">
      <a className="room-image" href={`/rooms/${room.slug}`} style={{ backgroundImage: `url(${room.image})` }} aria-label={`Посмотреть ${room.name}`}>
        <div className="tag-row">{room.badges.slice(0, 2).map(b => <span className="tag" key={b}>{b}</span>)}</div>
        <span className="image-arrow">↗</span>
      </a>
      <div className="room-info">
        <div><p>{room.guests} гостя · {room.area} м²</p><h3><a href={`/rooms/${room.slug}`}>{room.name}</a></h3></div>
        <div className="price">{room.oldPrice && <del>{formatMoney(room.oldPrice)}</del>}<strong>{formatMoney(room.price)}</strong><span>/ ночь</span></div>
      </div>
      <div className="room-amenities">{room.amenities.slice(0, 3).map(a => <span key={a}>{a}</span>)}</div>
    </article>
  );
}

function HomeView() {
  return (
    <>
      <Header />
      <main>
        <section className="hero" id="top" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="hero-shade" />
          <div className="hero-copy"><p className="eyebrow">Отдых среди сосен · 45 минут от Киева</p><h1>Место, где<br />становится тихо</h1><p className="hero-text">Уютные домики у воды, тёплый бассейн и SPA — всё, чтобы замедлиться и снова услышать себя.</p><div className="hero-actions"><a className="button button-primary" href="/booking">Забронировать отдых</a><a className="text-link" href="/rooms">Посмотреть номера <span>↗</span></a></div></div>
          <div className="hero-note"><span>4,9</span> по отзывам 286 гостей</div>
          <span className="scroll-note">листайте вниз <i>↓</i></span>
        </section>
        <SearchBar />

        <section className="intro section-pad"><div><p className="eyebrow green">Проживание</p><h2>Ваш дом в лесу</h2></div><div><p>Шесть продуманных пространств — от камерного домика для двоих до семейной виллы с собственным бассейном.</p><a className="line-link dark" href="/rooms">Все варианты проживания <span>↗</span></a></div></section>
        <section className="room-grid home-rooms">{rooms.slice(0, 3).map(room => <RoomCard room={room} key={room.slug} />)}</section>

        <section className="nature-story">
          <div className="story-image" style={{ backgroundImage: `url(${rooms[3].image})` }}><span>50°28′ пн. ш.<br />30°14′ в. д.</span></div>
          <div className="story-copy"><p className="eyebrow">Почему к нам</p><h2>Всё необходимое.<br /><em>И ничего лишнего.</em></h2><p>Мы создали место, где природа остаётся главной. Без громкой музыки и суеты — только лес, вода, тёплые дома и внимательный сервис.</p><div className="feature-list"><div><b>01</b><span><strong>Настоящая тишина</strong>12 гектаров закрытой лесной территории</span></div><div><b>02</b><span><strong>Забота в деталях</strong>От халатов до завтрака в ваш домик</span></div><div><b>03</b><span><strong>Близко к городу</strong>Всего 45 минут на автомобиле</span></div></div></div>
        </section>

        <section className="services-preview section-pad" id="services"><div className="section-head"><div><p className="eyebrow green">Время для себя</p><h2>Отдых, который<br />чувствуется телом</h2></div><a className="line-link dark" href="/services">Все услуги и цены <span>↗</span></a></div><div className="service-band"><div className="service-photo" style={{ backgroundImage: `url(${services[0].image})` }} /><div className="service-list">{[["pool","Тёплый бассейн","от 650 ₴"],["spa","SPA и массаж","от 1 400 ₴"],["sauna","Баня на дровах","от 1 800 ₴"],["food","Ресторан","с 08:00 до 22:00"],["fire","Беседки и мангал","от 450 ₴"],["parking","Парковка","для гостей бесплатно"]].map(([icon,title,price]) => <div key={title}><i>{icons[icon]}</i><span><strong>{title}</strong>{price}</span></div>)}</div></div></section>

        <section className="gallery-preview" id="gallery"><div className="gallery-title"><p className="eyebrow">Галерея</p><h2>Здесь легко<br />дышится</h2><a className="line-link" href="/gallery">Смотреть все фото <span>↗</span></a></div>{[rooms[1].image, services[1].image, rooms[4].image, services[3].image].map((img, i) => <div className={`gallery-tile tile-${i + 1}`} style={{ backgroundImage: `url(${img})` }} key={img} />)}</section>

        <section className="reviews section-pad"><div className="section-head"><div><p className="eyebrow green">Отзывы гостей</p><h2>То, что остаётся<br />после поездки</h2></div><div className="rating"><strong>4,9</strong><span>★★★★★<small>286 отзывов</small></span></div></div><div className="review-grid">{testimonials.map((t,i) => <blockquote key={t.name}><span>“</span><p>{t.quote}</p><footer><strong>{t.name}</strong>{t.stay}</footer><i>0{i+1}</i></blockquote>)}</div></section>

        <section className="location-section"><div className="location-copy"><p className="eyebrow">Как нас найти</p><h2>Недалеко.<br />Но совсем иначе.</h2><p>Киевская область, село Лесное<br />улица Озёрная, 12</p><div className="travel-times"><span><strong>45 мин</strong>от центра Киева</span><span><strong>25 мин</strong>от станции метро</span></div><a className="button button-primary" href="https://maps.google.com/?q=50.47,30.23" target="_blank" rel="noreferrer">Построить маршрут ↗</a></div><div className="map-placeholder"><div className="map-lines" /><span className="map-pin">ЛБ</span><b>Лесной берег<small>50.47, 30.23</small></b></div></section>

        <section className="final-cta"><div><p className="eyebrow">Ваш отдых начинается здесь</p><h2>Пора выбрать<br />свои даты</h2><a className="button button-primary" href="/booking">Забронировать отдых</a></div></section>
      </main>
      <Footer />
    </>
  );
}

function RoomsView() {
  const [guests, setGuests] = useState(1);
  const [maxPrice, setMaxPrice] = useState(12000);
  const [type, setType] = useState("Все");
  const [sort, setSort] = useState("popular");
  const [amenity, setAmenity] = useState("");
  const filtered = useMemo(() => rooms.filter(r => r.guests >= guests && r.price <= maxPrice && (type === "Все" || r.type === type) && (!amenity || r.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase())))).sort((a,b) => sort === "price-up" ? a.price-b.price : sort === "price-down" ? b.price-a.price : sort === "capacity" ? b.guests-a.guests : b.badges.length-a.badges.length), [guests,maxPrice,type,sort,amenity]);
  return <><Header solid /><main className="inner-page"><section className="page-hero"><p className="eyebrow green">Проживание</p><h1>Номера и домики</h1><p>Пространства для двоих, семьи или большой компании — каждое со своим характером и видом на лес.</p></section><SearchBar compact /><section className="catalog-layout"><aside className="filters"><h3>Фильтры</h3><label><span>Количество гостей</span><select value={guests} onChange={e=>setGuests(+e.target.value)}><option value="1">Любое</option><option value="2">2 гостя</option><option value="3">3 гостя</option><option value="4">4 гостя</option><option value="6">6 гостей</option></select></label><label><span>Тип размещения</span><select value={type} onChange={e=>setType(e.target.value)}>{["Все",...new Set(rooms.map(r=>r.type))].map(t=><option key={t}>{t}</option>)}</select></label><label><span>Цена до {formatMoney(maxPrice)}</span><input type="range" min="3500" max="12000" step="500" value={maxPrice} onChange={e=>setMaxPrice(+e.target.value)} /></label><label><span>Удобства</span><select value={amenity} onChange={e=>setAmenity(e.target.value)}><option value="">Все удобства</option><option>Бассейн</option><option>Камин</option><option>Кухня</option><option>Терраса</option><option>Парковка</option></select></label><button className="clear-button" onClick={()=>{setGuests(1);setMaxPrice(12000);setType("Все");setAmenity("")}}>Сбросить фильтры</button></aside><div className="catalog"><div className="catalog-bar"><span>Найдено: {filtered.length}</span><label>Сортировка <select value={sort} onChange={e=>setSort(e.target.value)}><option value="popular">По популярности</option><option value="price-up">Сначала дешевле</option><option value="price-down">Сначала дороже</option><option value="capacity">По вместимости</option></select></label></div><div className="room-grid catalog-grid">{filtered.map(r=><RoomCard room={r} key={r.slug}/>)}</div>{!filtered.length&&<div className="empty-state"><h3>Подходящих вариантов нет</h3><p>Попробуйте изменить фильтры или оставьте заявку — мы поможем подобрать домик.</p></div>}</div></section></main><Footer /></>;
}

function RoomView({ room }: { room: Room }) {
  const [active, setActive] = useState(0);
  const [checkIn,setCheckIn]=useState(""); const [checkOut,setCheckOut]=useState(""); const [status,setStatus]=useState("");
  const check = async () => { if(!checkIn||!checkOut){setStatus("Укажите обе даты");return;} setStatus("Проверяем…"); try { const res=await fetch(`/api/bookings?room=${room.slug}&checkIn=${checkIn}&checkOut=${checkOut}`); const json=await res.json(); setStatus(json.available ? "Свободно — можно бронировать" : "Эти даты уже заняты"); } catch { setStatus("Не удалось проверить. Попробуйте ещё раз."); } };
  return <><Header solid /><main className="inner-page room-page"><div className="breadcrumbs"><a href="/">Главная</a><span>/</span><a href="/rooms">Номера</a><span>/</span>{room.name}</div><section className="room-gallery"><button className="gallery-main" style={{backgroundImage:`url(${room.gallery[active]})`}} aria-label="Открыть фотографию"/><div>{room.gallery.slice(1,4).map((img,i)=><button key={img} onClick={()=>setActive(i+1)} style={{backgroundImage:`url(${img})`}} aria-label={`Фото ${i+2}`}/>)}</div></section><section className="room-detail"><div className="room-main"><div className="tag-row inline">{room.badges.map(b=><span className="tag" key={b}>{b}</span>)}</div><h1>{room.name}</h1><p className="lead">{room.description}</p><div className="room-facts"><span><b>{room.guests}</b> гостей</span><span><b>{room.area}</b> м²</span><span><b>{room.bedrooms}</b> спальни</span><span><b>{room.beds}</b> места</span></div><div className="detail-section"><h2>Удобства</h2><div className="amenities-grid">{room.amenities.map(a=><span key={a}>✓ {a}</span>)}</div></div><div className="detail-section rules-short"><h2>Важно знать</h2><div><p><strong>Заезд</strong>после 15:00</p><p><strong>Выезд</strong>до 11:00</p><p><strong>Отмена</strong>бесплатно за 7 суток</p><p><strong>Тишина</strong>с 22:00 до 08:00</p></div><a className="line-link dark" href="/rules">Все правила пребывания ↗</a></div></div><aside className="booking-card"><p>Стоимость за ночь</p><div className="booking-price">{room.oldPrice&&<del>{formatMoney(room.oldPrice)}</del>}<strong>{formatMoney(room.price)}</strong></div><label><span>Заезд</span><input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)}/></label><label><span>Выезд</span><input type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)}/></label><label><span>Гости</span><select><option>2 гостя</option><option>1 гость</option><option>{room.guests} гостей</option></select></label><button className="availability" onClick={check}>Проверить доступность</button>{status&&<p className={status.startsWith("Свободно")?"success-text":"status-text"}>{status}</p>}<a className="button button-dark" href={`/booking?room=${room.slug}&checkIn=${checkIn}&checkOut=${checkOut}`}>Забронировать</a><small>Заявка без оплаты. Менеджер свяжется для подтверждения.</small></aside></section><section className="similar section-pad"><div className="section-head"><h2>Похожие варианты</h2><a className="line-link dark" href="/rooms">Все номера ↗</a></div><div className="room-grid">{rooms.filter(r=>r.slug!==room.slug).slice(0,3).map(r=><RoomCard room={r} key={r.slug}/>)}</div></section></main><Footer /></>;
}

function ServicesView() {
  const cats=["Все",...new Set(services.map(s=>s.category))]; const [cat,setCat]=useState("Все"); const list=cat==="Все"?services:services.filter(s=>s.category===cat);
  return <><Header solid/><main className="inner-page"><section className="page-hero"><p className="eyebrow green">Забота о себе</p><h1>Услуги и цены</h1><p>Дополните отдых тем, что хочется именно вам: теплом, вкусом, движением или полной тишиной.</p></section><div className="pill-filter">{cats.map(c=><button className={c===cat?"active":""} onClick={()=>setCat(c)} key={c}>{c}</button>)}</div><section className="services-grid">{list.map(s=><article key={s.name}><div className="service-card-image" style={{backgroundImage:`url(${s.image})`}}><span>{s.category}</span></div><div className="service-card-body"><h2>{s.name}</h2><p>{s.description}</p><div className="service-meta"><span><small>Стоимость</small><strong>{formatMoney(s.price)}</strong> {s.unit}</span><span><small>Продолжительность</small>{s.duration}</span></div>{s.booking&&<em>Нужна предварительная запись</em>}<a className="button button-outline" href={`/booking?service=${encodeURIComponent(s.name)}`}>Добавить к бронированию</a></div></article>)}</section></main><Footer/></>;
}

function GalleryView() {
  const categories=["Все","Территория","Номера","Бассейн","SPA","Баня","Ресторан","Мероприятия"]; const [cat,setCat]=useState("Все"); const [modal,setModal]=useState<string|null>(null);
  const photos=[{c:"Территория",u:heroImage},{c:"Номера",u:rooms[0].image},{c:"Бассейн",u:services[0].image},{c:"SPA",u:services[1].image},{c:"Номера",u:rooms[1].image},{c:"Баня",u:services[3].image},{c:"Ресторан",u:services[5].image},{c:"Мероприятия",u:services[6].image},{c:"Номера",u:rooms[4].image},{c:"Территория",u:rooms[3].image},{c:"SPA",u:services[2].image},{c:"Ресторан",u:services[4].image}]; const visible=cat==="Все"?photos:photos.filter(p=>p.c===cat);
  return <><Header solid/><main className="inner-page"><section className="page-hero"><p className="eyebrow green">Атмосфера</p><h1>Галерея</h1><p>Несколько кадров, чтобы почувствовать ритм «Лесного берега» ещё до приезда.</p></section><div className="pill-filter">{categories.map(c=><button className={c===cat?"active":""} onClick={()=>setCat(c)} key={c}>{c}</button>)}</div><section className="masonry">{visible.map((p,i)=><button onClick={()=>setModal(p.u)} className={`masonry-item m-${i%5}`} key={p.u} style={{backgroundImage:`url(${p.u})`}}><span>{p.c} · увеличить</span></button>)}</section></main>{modal&&<div className="lightbox" role="dialog" aria-modal="true" onClick={()=>setModal(null)}><button aria-label="Закрыть">×</button><img src={modal} alt="Фотография комплекса"/></div>}<Footer/></>;
}

function ContactsView() {
  const [sent,setSent]=useState(false);
  return <><Header solid/><main className="inner-page"><section className="page-hero"><p className="eyebrow green">Будем рады видеть вас</p><h1>Контакты</h1><p>Напишите или позвоните — поможем выбрать домик и собрать идеальный отдых.</p></section><section className="contacts-layout"><div className="contact-details"><div><small>Телефон</small><a href="tel:+380671234567">+38 (067) 123-45-67</a><a href="tel:+380931234567">+38 (093) 123-45-67</a></div><div><small>Email</small><a href="mailto:hello@lisnyi-bereg.ua">hello@lisnyi-bereg.ua</a></div><div><small>Адрес</small><p>Киевская область, с. Лесное<br/>ул. Озёрная, 12</p></div><div><small>Часы работы</small><p>Ежедневно, 08:00–22:00<br/>Заселение круглосуточно</p></div><div className="social-row"><a href="#">Instagram ↗</a><a href="#">Facebook ↗</a><a href="#">Telegram ↗</a></div></div><form className="contact-form" onSubmit={e=>{e.preventDefault();setSent(true)}}><h2>Задать вопрос</h2><label><span>Ваше имя</span><input required placeholder="Как к вам обращаться"/></label><label><span>Телефон или email</span><input required placeholder="Для ответа"/></label><label><span>Сообщение</span><textarea required rows={5} placeholder="Расскажите, чем помочь"/></label><button className="button button-dark">Отправить</button>{sent&&<p className="success-text">Спасибо! Мы ответим в ближайшее время.</p>}</form></section><section className="route-section"><iframe title="Карта расположения комплекса" src="https://maps.google.com/maps?q=50.47,30.23&z=11&output=embed" loading="lazy"/><div><p className="eyebrow green">Как добраться</p><h2>45 минут от Киева</h2><p>Двигайтесь по Варшавской трассе до поворота на Лесное, затем ещё 4 км по указателям «Лесной берег». Последний километр — хорошая асфальтированная дорога.</p><a className="button button-dark" target="_blank" rel="noreferrer" href="https://maps.google.com/?q=50.47,30.23">Построить маршрут ↗</a><small>Адрес и координаты демонстрационные и настраиваются администратором.</small></div></section></main><Footer/></>;
}

const ruleSections = [
  ["Заезд и выезд","Заселение — после 15:00, выезд — до 11:00. Ранний заезд и поздний выезд возможны при наличии свободных номеров и согласовываются заранее."],
  ["Проживание с детьми","Дети любого возраста желанные гости. По запросу бесплатно предоставим кроватку и стульчик для кормления. Дети у воды и в SPA должны находиться под присмотром взрослых."],
  ["Размещение с животными","В отдельных домиках разрешено проживание с небольшими домашними животными по предварительному согласованию. Гость отвечает за чистоту и возможный ущерб."],
  ["Тишина на территории","С 22:00 до 08:00 действует режим тишины. Пожалуйста, не используйте громкую акустику и уважайте отдых других гостей."],
  ["Бассейн, SPA и баня","Соблюдайте инструкции персонала, не используйте стеклянную посуду у воды и сообщайте о медицинских противопоказаниях до процедур. Дети допускаются согласно возрастным ограничениям зоны."],
  ["Ответственность за имущество","Гость бережно относится к имуществу комплекса и возмещает подтверждённый ущерб. О неисправности просим сразу сообщить администратору."],
  ["Курение","Курение в домиках и общественных помещениях запрещено. На территории предусмотрены обозначенные места."],
  ["Мероприятия","Праздники, съёмки и визиты гостей, не указанных в бронировании, согласовываются заранее. Для мероприятий действуют отдельные условия и тарифы."],
  ["Оплата","После подтверждения вносится предоплата. Остаток оплачивается до заселения. Доступны безналичный расчёт и оплата картой."],
  ["Отмена и перенос","Бесплатная отмена возможна за 7 суток до заезда. При более поздней отмене предоплата удерживается или переносится на новые даты по согласованию."],
];

function RulesView() { return <><Header solid/><main className="inner-page"><section className="page-hero"><p className="eyebrow green">Перед поездкой</p><h1>Правила пребывания</h1><p>Небольшие договорённости, которые помогают всем гостям отдыхать спокойно и безопасно.</p></section><section className="rules-page">{ruleSections.map((r,i)=><article key={r[0]}><span>{String(i+1).padStart(2,"0")}</span><div><h2>{r[0]}</h2><p>{r[1]}</p></div></article>)}</section></main><Footer/></> }

function PolicyView({slug}:{slug:string}) { const p=policies[slug]||policies.privacy; return <><Header solid/><main className="inner-page legal-page"><div className="breadcrumbs"><a href="/">Главная</a><span>/</span>Правовые документы</div><section className="page-hero"><p className="eyebrow green">Документы</p><h1>{p.title}</h1><p>{p.intro}</p></section><div className="legal-note">Демонстрационный текст. Перед запуском сайта владелец должен проверить и адаптировать документ вместе с квалифицированным юристом.</div><section className="legal-content">{p.sections.map((s,i)=><article key={s.title}><span>{i+1}</span><div><h2>{s.title}</h2><p>{s.text}</p></div></article>)}</section><nav className="legal-nav"><a href="/policies/privacy">Конфиденциальность</a><a href="/policies/booking">Условия бронирования</a><a href="/policies/cancellation">Отмена и возврат</a><a href="/policies/consent">Обработка данных</a><a href="/policies/offer">Публичная оферта</a></nav></main><Footer/></> }

type BookingState = {checkIn:string;checkOut:string;room:string;adults:number;children:number;ages:string;serviceNames:string[];name:string;phone:string;email:string;comment:string;consent:boolean};
function BookingView() {
  const [step,setStep]=useState(1); const [error,setError]=useState(""); const [loading,setLoading]=useState(false); const [code,setCode]=useState(""); const [data,setData]=useState<BookingState>({checkIn:"",checkOut:"",room:rooms[0].slug,adults:2,children:0,ages:"",serviceNames:[],name:"",phone:"",email:"",comment:"",consent:false});
  useEffect(()=>{const params=new URLSearchParams(window.location.search);setData(current=>({...current,checkIn:params.get("checkIn")||current.checkIn,checkOut:params.get("checkOut")||current.checkOut,room:params.get("room")||current.room,adults:+(params.get("guests")||current.adults),serviceNames:params.get("service")?[params.get("service")!]:current.serviceNames}))},[]);
  const selected=rooms.find(r=>r.slug===data.room)!; const nights=data.checkIn&&data.checkOut?Math.max(1,Math.ceil((new Date(data.checkOut).getTime()-new Date(data.checkIn).getTime())/86400000)):1; const extras=services.filter(s=>data.serviceNames.includes(s.name)).reduce((a,s)=>a+s.price,0); const total=selected.price*nights+extras;
  const next=()=>{setError(""); if(step===1&&(!data.checkIn||!data.checkOut||data.checkOut<=data.checkIn)){setError("Укажите корректные даты проживания.");return;} if(step===5&&(!data.name||!data.phone||!data.email||!data.consent)){setError("Заполните обязательные поля и подтвердите согласие.");return;} setStep(Math.min(6,step+1)); window.scrollTo({top:0,behavior:"smooth"});};
  const submit=async()=>{setLoading(true);setError(""); try{const res=await fetch("/api/bookings",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({...data,total,roomName:selected.name,nights})}); const json=await res.json(); if(!res.ok) throw new Error(json.error||"Не удалось отправить заявку"); setCode(json.code);setStep(7);}catch(e){setError(e instanceof Error?e.message:"Не удалось отправить заявку");}finally{setLoading(false)}};
  if(step===7)return <><Header solid/><main className="booking-success"><span className="success-icon">✓</span><p className="eyebrow green">Заявка отправлена</p><h1>Спасибо, {data.name.split(" ")[0]}!</h1><p>Мы получили вашу заявку <strong>№ {code}</strong>. Сейчас она ожидает подтверждения — менеджер свяжется с вами по телефону {data.phone}.</p><div className="success-summary"><span>{selected.name}</span><span>{data.checkIn} — {data.checkOut}</span><span>{formatMoney(total)}</span></div><a className="button button-dark" href="/">Вернуться на главную</a></main><Footer/></>;
  const labels=["Даты","Номер","Гости","Услуги","Ваши данные","Проверка"];
  return <><Header solid/><main className="booking-page"><section className="booking-head"><p className="eyebrow green">Онлайн-бронирование</p><h1>Ваш отдых</h1><div className="stepper">{labels.map((l,i)=><button onClick={()=>i+1<step&&setStep(i+1)} className={i+1===step?"active":i+1<step?"done":""} key={l}><span>{i+1<step?"✓":i+1}</span>{l}</button>)}</div></section><div className="booking-layout"><section className="booking-step">
    {step===1&&<><p className="step-kicker">Шаг 1 из 6</p><h2>Когда вы хотите приехать?</h2><div className="date-grid"><label><span>Дата заезда</span><input required type="date" value={data.checkIn} onChange={e=>setData({...data,checkIn:e.target.value})}/></label><label><span>Дата выезда</span><input required type="date" min={data.checkIn} value={data.checkOut} onChange={e=>setData({...data,checkOut:e.target.value})}/></label></div><p className="helper">Стандартное заселение после 15:00, выезд до 11:00.</p></>}
    {step===2&&<><p className="step-kicker">Шаг 2 из 6</p><h2>Выберите домик</h2><div className="room-options">{rooms.filter(r=>r.guests>=data.adults+data.children).map(r=><label className={data.room===r.slug?"selected":""} key={r.slug}><input type="radio" name="room" value={r.slug} checked={data.room===r.slug} onChange={()=>setData({...data,room:r.slug})}/><img src={r.image} alt=""/><span><strong>{r.name}</strong><small>{r.guests} гостей · {r.area} м²</small></span><b>{formatMoney(r.price)}<small>/ ночь</small></b></label>)}</div></>}
    {step===3&&<><p className="step-kicker">Шаг 3 из 6</p><h2>Кто будет отдыхать?</h2><div className="counter-list"><label><span><strong>Взрослые</strong>от 18 лет</span><input type="number" min="1" max={selected.guests} value={data.adults} onChange={e=>setData({...data,adults:+e.target.value})}/></label><label><span><strong>Дети</strong>до 18 лет</span><input type="number" min="0" max="4" value={data.children} onChange={e=>setData({...data,children:+e.target.value})}/></label>{data.children>0&&<label className="ages"><span><strong>Возраст детей</strong>через запятую</span><input value={data.ages} onChange={e=>setData({...data,ages:e.target.value})} placeholder="Например: 4, 9"/></label>}</div></>}
    {step===4&&<><p className="step-kicker">Шаг 4 из 6</p><h2>Добавьте впечатления</h2><div className="extra-options">{services.slice(0,6).map(s=><label className={data.serviceNames.includes(s.name)?"selected":""} key={s.name}><input type="checkbox" checked={data.serviceNames.includes(s.name)} onChange={e=>setData({...data,serviceNames:e.target.checked?[...data.serviceNames,s.name]:data.serviceNames.filter(n=>n!==s.name)})}/><span><strong>{s.name}</strong><small>{s.duration}{s.booking?" · по записи":""}</small></span><b>+ {formatMoney(s.price)}</b></label>)}</div></>}
    {step===5&&<><p className="step-kicker">Шаг 5 из 6</p><h2>Как с вами связаться?</h2><div className="guest-form"><label><span>Имя и фамилия *</span><input value={data.name} onChange={e=>setData({...data,name:e.target.value})} placeholder="Анна Коваленко"/></label><label><span>Номер телефона *</span><input value={data.phone} onChange={e=>setData({...data,phone:e.target.value})} placeholder="+38 (___) ___-__-__"/></label><label><span>Email *</span><input type="email" value={data.email} onChange={e=>setData({...data,email:e.target.value})} placeholder="name@example.com"/></label><label className="full"><span>Комментарий</span><textarea rows={4} value={data.comment} onChange={e=>setData({...data,comment:e.target.value})} placeholder="Особые пожелания, время приезда…"/></label><label className="check full"><input type="checkbox" checked={data.consent} onChange={e=>setData({...data,consent:e.target.checked})}/><span>Я согласен(на) с <a href="/rules">правилами пребывания</a>, <a href="/policies/booking">условиями бронирования</a> и <a href="/policies/privacy">политикой конфиденциальности</a>.</span></label></div></>}
    {step===6&&<><p className="step-kicker">Шаг 6 из 6</p><h2>Проверьте заявку</h2><div className="review-order"><div><span>Проживание</span><b>{selected.name}</b><small>{data.checkIn} — {data.checkOut} · {nights} ноч.</small><strong>{formatMoney(selected.price*nights)}</strong></div><div><span>Гости</span><b>{data.adults} взрослых{data.children?`, ${data.children} детей`:""}</b></div>{data.serviceNames.length>0&&<div><span>Дополнительно</span>{data.serviceNames.map(n=><b key={n}>{n}</b>)}<strong>{formatMoney(extras)}</strong></div>}<div><span>Контакт</span><b>{data.name}</b><small>{data.phone} · {data.email}</small></div></div><div className="pending-note"><span>i</span><p><strong>Оплата сейчас не требуется</strong>После отправки заявка получит статус «Ожидает подтверждения». Менеджер свяжется с вами и уточнит предоплату.</p></div></>}
    {error&&<p className="form-error" role="alert">{error}</p>}<div className="step-actions">{step>1&&<button className="back-button" onClick={()=>setStep(step-1)}>← Назад</button>}<button className="button button-dark" disabled={loading} onClick={step===6?submit:next}>{loading?"Отправляем…":step===6?"Отправить заявку":"Продолжить →"}</button></div>
  </section><aside className="order-card"><img src={selected.image} alt=""/><p>{selected.name}</p><div><span>{data.checkIn||"Дата заезда"} — {data.checkOut||"Дата выезда"}</span><span>{data.adults} взрослых{data.children?` · ${data.children} детей`:""}</span></div><div className="order-total"><span>Итого</span><strong>{formatMoney(total)}</strong></div><small>Финальная стоимость подтверждается менеджером.</small></aside></div></main><Footer/></>;
}

export default function PublicSite({ view, slug }: { view: View; slug?: string }) {
  if (view === "rooms") return <RoomsView />;
  if (view === "room") return <RoomView room={rooms.find(r => r.slug === slug) || rooms[0]} />;
  if (view === "services") return <ServicesView />;
  if (view === "gallery") return <GalleryView />;
  if (view === "contacts") return <ContactsView />;
  if (view === "rules") return <RulesView />;
  if (view === "policy") return <PolicyView slug={slug || "privacy"} />;
  if (view === "booking") return <BookingView />;
  return <HomeView />;
}
