import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/de8fd650-82d2-41fe-81ca-31fb7d519dde/files/bde72612-54b6-4ff7-a4ba-16dd05c4e309.jpg";
const PORTRAIT_IMG = "https://cdn.poehali.dev/projects/de8fd650-82d2-41fe-81ca-31fb7d519dde/files/20fcf92e-e21e-4c1f-8638-e944b3bc2140.jpg";
const COUPLE_IMG = "https://cdn.poehali.dev/projects/de8fd650-82d2-41fe-81ca-31fb7d519dde/files/e5743932-a935-42f8-a5eb-aa7c4d7a13b2.jpg";
const FAMILY_IMG = "https://cdn.poehali.dev/projects/de8fd650-82d2-41fe-81ca-31fb7d519dde/files/90bad333-6f5a-4586-9e08-a4135953d1ca.jpg";

const services = [
  { id: 1, title: "Портретная съёмка", description: "Индивидуальная работа с клиентом, создание образа, профессиональный свет и ретушь. Идеально для личного бренда и соцсетей.", duration: "2–3 часа", icon: "User" },
  { id: 2, title: "Семейная съёмка", description: "Тёплые, живые кадры вашей семьи. Работаем с детьми любого возраста, создаём уютную атмосферу без постановочности.", duration: "3–4 часа", icon: "Users" },
  { id: 3, title: "Бизнес-фотография", description: "Профессиональные фото для резюме, корпоративного сайта, LinkedIn. Строгий или креативный стиль на выбор.", duration: "1–2 часа", icon: "Briefcase" },
  { id: 4, title: "Свадебная съёмка", description: "Вечные воспоминания о вашем особенном дне. Репортажный и постановочный стили, полная обработка снимков.", duration: "8–12 часов", icon: "Heart" },
  { id: 5, title: "Детская съёмка", description: "Нежные, искренние кадры малышей. Студия адаптирована для работы с детьми: безопасная, светлая, игровая зона.", duration: "1.5–2 часа", icon: "Star" },
  { id: 6, title: "Предметная съёмка", description: "Товары, украшения, еда и продукция для маркетплейсов и каталогов. Чистый фон или стилизованные сцены.", duration: "2–4 часа", icon: "Camera" },
];

const pricing = [
  {
    name: "Старт", price: "4 900", description: "Для тех, кто хочет попробовать", highlight: false,
    features: ["1 час съёмки", "30 обработанных фото", "1 образ / 1 локация", "Сдача за 7 дней"],
  },
  {
    name: "Стандарт", price: "8 900", description: "Самый популярный выбор", highlight: true,
    features: ["2 часа съёмки", "80 обработанных фото", "2 образа / 2 локации", "Сдача за 5 дней", "Онлайн-галерея"],
  },
  {
    name: "Премиум", price: "14 900", description: "Максимум возможностей", highlight: false,
    features: ["4 часа съёмки", "150+ обработанных фото", "Без ограничений по образам", "Сдача за 3 дня", "Онлайн-галерея + USB", "Визажист включён"],
  },
];

const reviews = [
  { name: "Анна К.", rating: 5, text: "Потрясающая атмосфера и профессиональный подход! Фотографии вышли лучше, чем я ожидала. Уже записалась на следующую сессию.", date: "Март 2024", type: "Портретная съёмка" },
  { name: "Семья Петровых", rating: 5, text: "Снимали всей семьёй с двумя маленькими детьми. Фотограф нашёл подход к каждому, дети веселились и не чувствовали скованности. Фото — шедевр!", date: "Февраль 2024", type: "Семейная съёмка" },
  { name: "Михаил В.", rating: 5, text: "Делал бизнес-фото для нового сайта. Результат превзошёл ожидания: строго, стильно, профессионально. Клиенты уже отметили обновление.", date: "Апрель 2024", type: "Бизнес-фото" },
  { name: "Дарья и Алексей", rating: 5, text: "Наша свадебная съёмка — это отдельный шедевр. Каждый кадр — история. Спасибо за внимательность и тепло в этот особенный день.", date: "Май 2024", type: "Свадьба" },
];

const gallery = [
  { img: PORTRAIT_IMG, label: "Портрет" },
  { img: HERO_IMG, label: "Студия" },
  { img: COUPLE_IMG, label: "Пара" },
  { img: FAMILY_IMG, label: "Семья" },
  { img: PORTRAIT_IMG, label: "Мода" },
  { img: COUPLE_IMG, label: "Lifestyle" },
];

const timeSlots = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00"];
const sessionTypes = ["Портретная", "Семейная", "Бизнес-фото", "Свадебная", "Детская", "Предметная"];
const navLinks = [
  { label: "УСЛУГИ", href: "#services" },
  { label: "ПРАЙС", href: "#pricing" },
  { label: "ГАЛЕРЕЯ", href: "#gallery" },
  { label: "ОТЗЫВЫ", href: "#reviews" },
  { label: "КОНТАКТЫ", href: "#contacts" },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingDone, setBookingDone] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [galleryActive, setGalleryActive] = useState<number | null>(null);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleBookingSubmit = () => {
    if (bookingName && bookingPhone && selectedDate && selectedTime && selectedType) {
      setBookingDone(true);
    }
  };

  const closeBooking = () => {
    setBookingOpen(false);
    setBookingDone(false);
    setBookingStep(1);
    setSelectedDate("");
    setSelectedTime("");
    setSelectedType("");
    setBookingName("");
    setBookingPhone("");
  };

  return (
    <div className="min-h-screen bg-background font-golos overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="font-cormorant text-xl sm:text-2xl tracking-[0.2em] font-light"
          >
            LUMIÈRE
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="nav-link text-[11px] tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors font-golos font-light"
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setBookingOpen(true)}
            className="hidden md:block text-[11px] tracking-[0.15em] bg-foreground text-primary-foreground px-5 py-2.5 hover:bg-foreground/80 transition-colors"
          >
            ЗАПИСАТЬСЯ
          </button>
          <button className="md:hidden p-1" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background/98 backdrop-blur-sm">
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="text-left text-[12px] tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors py-1"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => { setBookingOpen(true); setMenuOpen(false); }}
                className="text-[11px] tracking-[0.15em] bg-foreground text-primary-foreground px-5 py-3 mt-2 hover:bg-foreground/80 transition-colors"
              >
                ЗАПИСАТЬСЯ
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex items-end pb-16 sm:pb-24">
        <div className="absolute inset-0 image-hover">
          <img src={HERO_IMG} alt="Фотостудия LUMIÈRE" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 text-white">
          <p className="text-[10px] sm:text-[11px] tracking-[0.3em] mb-4 sm:mb-6 opacity-70 animate-fade-up">
            ПРОФЕССИОНАЛЬНАЯ ФОТОСТУДИЯ
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-cormorant font-light leading-[0.95] mb-6 sm:mb-8 animate-fade-up delay-100">
            Каждый кадр —<br />
            <em>история</em>
          </h1>
          <p className="text-sm sm:text-base font-golos font-light max-w-md opacity-80 mb-8 sm:mb-10 animate-fade-up delay-200">
            Создаём портреты, семейные истории и коммерческие образы,<br className="hidden sm:block" />
            которые хочется рассматривать снова и снова
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-up delay-300">
            <button
              onClick={() => setBookingOpen(true)}
              className="text-[11px] tracking-[0.15em] bg-white text-black px-8 py-4 hover:bg-white/90 transition-colors"
            >
              ЗАПИСАТЬСЯ НА СЕССИЮ
            </button>
            <button
              onClick={() => scrollTo("#gallery")}
              className="text-[11px] tracking-[0.15em] border border-white/50 text-white px-8 py-4 hover:border-white transition-colors"
            >
              СМОТРЕТЬ РАБОТЫ
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 sm:py-28 max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex items-end justify-between mb-12 sm:mb-16">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-3">01 / УСЛУГИ</p>
            <h2 className="text-4xl sm:text-5xl font-cormorant font-light">Виды съёмки</h2>
          </div>
          <div className="hidden sm:block w-24 h-px bg-border" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {services.map((s) => (
            <div key={s.id} className="bg-background p-7 sm:p-8 group hover:bg-secondary/50 transition-colors">
              <div className="mb-5">
                <Icon name={s.icon} size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <h3 className="font-cormorant text-2xl sm:text-3xl font-light mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4">{s.description}</p>
              <p className="text-[10px] tracking-[0.2em] text-muted-foreground">{s.duration}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 sm:py-28 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="mb-12 sm:mb-16">
            <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-3">02 / ТАРИФЫ</p>
            <h2 className="text-4xl sm:text-5xl font-cormorant font-light">Прайс-лист</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
            {pricing.map((plan) => (
              <div key={plan.name} className={`p-8 sm:p-10 flex flex-col ${plan.highlight ? "bg-foreground text-primary-foreground" : "bg-background"}`}>
                {plan.highlight && <p className="text-[9px] tracking-[0.3em] mb-4 opacity-60">ПОПУЛЯРНЫЙ ВЫБОР</p>}
                <h3 className="font-cormorant text-3xl font-light mb-1">{plan.name}</h3>
                <p className={`text-[11px] mb-6 ${plan.highlight ? "opacity-60" : "text-muted-foreground"}`}>{plan.description}</p>
                <div className="mb-8">
                  <span className="font-cormorant text-5xl font-light">{plan.price}</span>
                  <span className={`text-sm ml-1 ${plan.highlight ? "opacity-60" : "text-muted-foreground"}`}> ₽</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Icon name="Check" size={14} className={`mt-0.5 flex-shrink-0 ${plan.highlight ? "opacity-70" : "text-muted-foreground"}`} />
                      <span className={plan.highlight ? "opacity-80" : "text-muted-foreground"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setBookingOpen(true)}
                  className={`text-[11px] tracking-[0.15em] py-3.5 transition-colors ${plan.highlight ? "bg-primary-foreground text-foreground hover:bg-primary-foreground/90" : "border border-border text-foreground hover:bg-secondary"}`}
                >
                  ВЫБРАТЬ
                </button>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[11px] text-muted-foreground text-center tracking-wide">
            Индивидуальные условия для коммерческих проектов — обсуждаем отдельно
          </p>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 sm:py-28 max-w-6xl mx-auto px-6 sm:px-8">
        <div className="mb-12 sm:mb-16">
          <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-3">03 / ПОРТФОЛИО</p>
          <h2 className="text-4xl sm:text-5xl font-cormorant font-light">Наши работы</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border">
          {gallery.map((item, i) => (
            <div
              key={i}
              className="image-hover relative cursor-pointer aspect-[3/4] bg-secondary"
              onClick={() => setGalleryActive(i)}
            >
              <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {galleryActive !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setGalleryActive(null)}>
          <button className="absolute top-5 right-5 text-white/70 hover:text-white" onClick={() => setGalleryActive(null)}>
            <Icon name="X" size={24} />
          </button>
          <img
            src={gallery[galleryActive].img}
            alt={gallery[galleryActive].label}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* REVIEWS */}
      <section id="reviews" className="py-20 sm:py-28 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="mb-12 sm:mb-16">
            <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-3">04 / ОТЗЫВЫ</p>
            <h2 className="text-4xl sm:text-5xl font-cormorant font-light">Говорят клиенты</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
            {reviews.map((r, i) => (
              <div key={i} className="bg-background p-8 sm:p-10">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Icon key={j} name="Star" size={12} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="font-cormorant text-xl sm:text-2xl font-light italic leading-relaxed mb-6 text-foreground/90">
                  «{r.text}»
                </p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="text-[11px] text-muted-foreground tracking-wide">{r.type}</p>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{r.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 sm:py-28 max-w-6xl mx-auto px-6 sm:px-8">
        <div className="mb-12 sm:mb-16">
          <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-3">05 / КОНТАКТЫ</p>
          <h2 className="text-4xl sm:text-5xl font-cormorant font-light">Где нас найти</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          <div className="bg-background p-8 sm:p-12 space-y-8">
            <div className="space-y-6">
              {[
                { icon: "MapPin", label: "АДРЕС", content: ["ул. Пушкина, 14, 2 этаж, офис 201", "Москва, метро Тверская"] },
                { icon: "Phone", label: "ТЕЛЕФОН", content: ["+7 (495) 123-45-67"] },
                { icon: "Mail", label: "ПОЧТА", content: ["hello@lumiere.ru"] },
                { icon: "Clock", label: "РЕЖИМ РАБОТЫ", content: ["Пн–Пт: 10:00 — 20:00", "Сб–Вс: 10:00 — 18:00"] },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <Icon name={item.icon} size={18} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-muted-foreground mb-1">{item.label}</p>
                    {item.content.map((line, i) => (
                      <p key={i} className={`font-light ${i > 0 ? "text-sm text-muted-foreground mt-0.5" : ""}`}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 pt-2">
              <a href="#" className="flex items-center gap-2 text-[11px] tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Instagram" size={16} />Instagram
              </a>
              <a href="#" className="flex items-center gap-2 text-[11px] tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Send" size={16} />Telegram
              </a>
            </div>
          </div>
          <div className="bg-foreground text-primary-foreground p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <h3 className="font-cormorant text-3xl sm:text-4xl font-light mb-4">Готовы к съёмке?</h3>
              <p className="font-light opacity-70 text-sm leading-relaxed">
                Запишитесь онлайн за 2 минуты или напишите нам — ответим в течение часа и подберём удобное время.
              </p>
            </div>
            <div className="mt-8 space-y-3">
              <button
                onClick={() => setBookingOpen(true)}
                className="w-full text-[11px] tracking-[0.15em] bg-primary-foreground text-foreground py-4 hover:bg-primary-foreground/90 transition-colors"
              >
                ОНЛАЙН-ЗАПИСЬ
              </button>
              <a
                href="https://t.me/lumiere_photo"
                className="flex items-center justify-center gap-2 w-full text-[11px] tracking-[0.15em] border border-white/30 text-white py-4 hover:border-white/60 transition-colors"
              >
                <Icon name="Send" size={14} />
                НАПИСАТЬ В TELEGRAM
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-cormorant text-xl tracking-[0.2em]">LUMIÈRE</p>
          <p className="text-[11px] text-muted-foreground text-center">© 2024 Фотостудия LUMIÈRE. Все права защищены.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="ArrowUp" size={14} />НАВЕРХ
          </button>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      {bookingOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={closeBooking}
        >
          <div
            className="bg-background w-full sm:max-w-lg sm:w-full max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 sm:p-8 border-b border-border">
              <div>
                <p className="text-[10px] tracking-[0.2em] text-muted-foreground mb-1">ОНЛАЙН-ЗАПИСЬ</p>
                <h3 className="font-cormorant text-2xl sm:text-3xl font-light">Бронирование сессии</h3>
              </div>
              <button onClick={closeBooking} className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {bookingDone ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mx-auto mb-5">
                    <Icon name="Check" size={24} />
                  </div>
                  <h4 className="font-cormorant text-2xl sm:text-3xl font-light mb-3">Вы записаны!</h4>
                  <p className="text-muted-foreground text-sm font-light mb-2">
                    {selectedType} съёмка · {selectedDate} · {selectedTime}
                  </p>
                  <p className="text-sm text-muted-foreground">Мы позвоним вам для подтверждения в ближайшее время.</p>
                  <button
                    onClick={closeBooking}
                    className="mt-8 text-[11px] tracking-[0.15em] bg-foreground text-primary-foreground px-8 py-3 hover:bg-foreground/80 transition-colors"
                  >
                    ЗАКРЫТЬ
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className={`h-0.5 flex-1 transition-colors ${s <= bookingStep ? "bg-foreground" : "bg-border"}`} />
                    ))}
                  </div>
                  <p className="text-[10px] tracking-[0.2em] text-muted-foreground">ШАГ {bookingStep} / 3</p>

                  {bookingStep === 1 && (
                    <div>
                      <p className="font-cormorant text-xl font-light mb-5">Выберите вид съёмки</p>
                      <div className="grid grid-cols-2 gap-2">
                        {sessionTypes.map((t) => (
                          <button
                            key={t}
                            onClick={() => setSelectedType(t)}
                            className={`text-[12px] py-3.5 px-4 text-left tracking-wide border transition-colors ${selectedType === t ? "border-foreground bg-foreground text-primary-foreground" : "border-border hover:border-foreground/40"}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                      <button
                        disabled={!selectedType}
                        onClick={() => setBookingStep(2)}
                        className="mt-6 w-full text-[11px] tracking-[0.15em] bg-foreground text-primary-foreground py-4 hover:bg-foreground/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        ДАЛЕЕ
                      </button>
                    </div>
                  )}

                  {bookingStep === 2 && (
                    <div>
                      <p className="font-cormorant text-xl font-light mb-5">Выберите дату и время</p>
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">ДАТА</label>
                          <input
                            type="date"
                            value={selectedDate}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-foreground transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">ВРЕМЯ</label>
                          <div className="grid grid-cols-4 gap-2">
                            {timeSlots.map((t) => (
                              <button
                                key={t}
                                onClick={() => setSelectedTime(t)}
                                className={`text-[12px] py-2.5 border transition-colors ${selectedTime === t ? "border-foreground bg-foreground text-primary-foreground" : "border-border hover:border-foreground/40"}`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-6">
                        <button onClick={() => setBookingStep(1)} className="flex-1 text-[11px] tracking-[0.15em] border border-border py-4 hover:bg-secondary transition-colors">НАЗАД</button>
                        <button
                          disabled={!selectedDate || !selectedTime}
                          onClick={() => setBookingStep(3)}
                          className="flex-1 text-[11px] tracking-[0.15em] bg-foreground text-primary-foreground py-4 hover:bg-foreground/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          ДАЛЕЕ
                        </button>
                      </div>
                    </div>
                  )}

                  {bookingStep === 3 && (
                    <div>
                      <p className="font-cormorant text-xl font-light mb-5">Ваши контакты</p>
                      <div className="space-y-3">
                        <div>
                          <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">ИМЯ</label>
                          <input
                            type="text"
                            placeholder="Как вас зовут?"
                            value={bookingName}
                            onChange={(e) => setBookingName(e.target.value)}
                            className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">ТЕЛЕФОН</label>
                          <input
                            type="tel"
                            placeholder="+7 (___) ___-__-__"
                            value={bookingPhone}
                            onChange={(e) => setBookingPhone(e.target.value)}
                            className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
                          />
                        </div>
                      </div>
                      <div className="mt-5 p-4 bg-secondary text-[12px] space-y-1">
                        <p className="text-muted-foreground">Резюме заявки:</p>
                        <p>{selectedType} · {selectedDate} · {selectedTime}</p>
                      </div>
                      <div className="flex gap-3 mt-6">
                        <button onClick={() => setBookingStep(2)} className="flex-1 text-[11px] tracking-[0.15em] border border-border py-4 hover:bg-secondary transition-colors">НАЗАД</button>
                        <button
                          disabled={!bookingName || !bookingPhone}
                          onClick={handleBookingSubmit}
                          className="flex-1 text-[11px] tracking-[0.15em] bg-foreground text-primary-foreground py-4 hover:bg-foreground/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          ЗАПИСАТЬСЯ
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
