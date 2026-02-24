import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Smartphone, 
  Wrench, 
  Headset, 
  ChevronDown,
  X,
  Phone,
  CheckCircle2
} from 'lucide-react';

// --- ДАННЫЕ С САЙТА ---
const CARS = [
  { brand: 'Geely', model: 'Atlas Cool', desc: 'Geely (Bouye Cool)', price: 'от 20 000 ₸', img: '/img/GeelyAtlasCool.png' },
  { brand: 'Geely', model: 'Bouye L', desc: 'Geely', price: 'от 20 000 ₸', img: '/img/GeelyBouyeL.png' },
  { brand: 'Toyota', model: 'Camry XV80', desc: 'Toyota', price: 'от 20 000 ₸', img: '/img/ToyotaСamryVX80.png' },
  { brand: 'Toyota', model: 'RAV4 2k25', desc: 'Toyota', price: 'от 20 000 ₸', img: '/img/ToyotaRAV42025.png' },
  { brand: 'Toyota', model: 'Highlander 2k25', desc: 'Toyota', price: 'от 20 000 ₸', img: '/img/ToyotaHighlander2025.png' },
  { brand: 'Toyota', model: 'Sienna 2k25', desc: 'Toyota', price: 'от 20 000 ₸', img: '/img/ToyotaSienna2025.png' },
  { brand: 'Toyota', model: 'Venza 2k25', desc: 'Toyota', price: 'от 20 000 ₸', img: '/img/ToyotaVenza2025.png' },
  { brand: 'Toyota', model: 'Crown Kluger', desc: 'Toyota 2k25', price: 'от 20 000 ₸', img: '/img/ToyotaCrownKluger2025.png' },
  { brand: 'Changan', model: 'Uni-K', desc: 'Changan', price: 'от 20 000 ₸', img: '/img/ChanganUni-K.png' },
  { brand: 'Changan', model: 'X5 Plus', desc: 'Changan', price: 'от 20 000 ₸', img: '/img/ChanganX5Plus.png' },
  { brand: 'Changan', model: 'CS55+', desc: 'Changan', price: 'от 20 000 ₸', img: '/img/ChanganCS55+.png' },
  { brand: 'Geely', model: 'Coolray', desc: 'Geely 2k24-2k25', price: 'от 20 000 ₸', img: '/img/CoolrayGeely2025.png' },
  { brand: 'Geely', model: 'Monjaro', desc: 'Geely', price: 'от 20 000 ₸', img: '/img/GeelyMonjaro.png' },
  { brand: 'SsangYong', model: 'Rexton', desc: 'SsangYong', price: 'от 20 000 ₸', img: '/img/SsangYongRexton.png' },
  { brand: 'SsangYong', model: 'Korando', desc: 'SsangYong', price: 'от 20 000 ₸', img: '/img/SsangYongKorando.png' },
  { brand: 'SsangYong', model: 'Tivoli', desc: 'SsangYong', price: 'от 20 000 ₸', img: '/img/SsangYongTivoli.png' },
];

const FAQ = [
  { q: 'Сколько времени занимает работа?', a: 'От 1 до 2 часов. Всю процедуру мы проводим прямо при вас.' },
  { q: 'Как вы работаете (выезд)?', a: 'Работаем на выезд к клиенту в пределах города или договариваемся о встрече в удобном месте.' },
  { q: 'Слетит ли гарантия у дилера?', a: 'Нет. Мы обновляем только мультимедийное ПО, не затрагивая блоки управления двигателем (ЭБУ).' },
  { q: 'Нужно ли оставлять машину на день?', a: 'Нет, все работы выполняются в вашем присутствии в течение пары часов.' },
  { q: 'Переводится ли приборная панель?', a: 'Да, в тарифе "ПРО" мы переводим и мультимедиа, и цифровую приборную панель.' },
  { q: 'Будут ли работать Яндекс и YouTube?', a: 'Обязательно. Мы устанавливаем привычные сервисы для комфортного вождения.' },
  { q: 'А если моей машины нет в списке?', a: 'Просто оставьте заявку. Мы работаем с огромной базой прошивок для большинства современных авто — проверим и дадим точный ответ по вашей модели.' },
];

const STEPS = [
  { title: 'Заявка', desc: 'Уточняем модель авто и версию прошивки.' },
  { title: 'Встреча', desc: 'Выезжаем к вам или встречаемся в городе.' },
  { title: 'Прошивка', desc: 'Устанавливаем русский язык и приложения.' },
  { title: 'Готово', desc: 'Тестируем функции. Вы наслаждаетесь авто.' }
];

// --- ЗАГОТОВЛЕННЫЕ СООБЩЕНИЯ (КРАТКИЕ) ---
const WA_MESSAGE = "Здравствуйте! Интересует русификация авто.";
const TG_MESSAGE = "Здравствуйте! Интересует русификация авто.";

// --- ФОН ---
const BackgroundGlow = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[#020203]" />
    <div className="absolute top-[-10%] left-[-20%] w-[70%] h-[50%] bg-red-600/10 blur-[100px] rounded-full transform-gpu" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[40%] bg-rose-500/10 blur-[100px] rounded-full transform-gpu" />
  </div>
);

// --- ДЕМО ЭКРАНА (АНИМАЦИЯ ПЕРЕВОДА) ---
const TranslationDemo = () => {
  const [isRu, setIsRu] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => setIsRu(prev => !prev), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[140px] bg-[#0a0a0a] border border-white/10 rounded-[28px] overflow-hidden flex flex-col items-center justify-center shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] mt-4">
       <div className="absolute top-4 left-5 flex gap-1.5">
         <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
         <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
         <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
       </div>
       <AnimatePresence mode="wait">
         <motion.div
           key={isRu ? 'ru' : 'cn'}
           initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.9 }}
           animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
           exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
           transition={{ duration: 0.5 }}
           className="text-center"
         >
           <div className="text-[32px] mb-2">{isRu ? '🇷🇺' : '🇨🇳'}</div>
           <div className={`text-[16px] font-bold tracking-[0.15em] uppercase ${isRu ? 'text-white font-russo' : 'text-red-500/80'}`}>
             {isRu ? 'НАВИГАТОР / МУЗЫКА' : '导航系统 / 音乐媒体'}
           </div>
         </motion.div>
       </AnimatePresence>
       
       <motion.div 
         animate={{ y: ['-100%', '400%'] }} 
         transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
         className="absolute left-0 top-0 w-full h-8 bg-gradient-to-b from-transparent via-red-500/30 to-transparent pointer-events-none"
       />
    </div>
  );
};

export default function MobileLandingLayout() {
  const [formData, setFormData] = useState({ name: '', phone: '', brand: '', model: '', year: '' });
  const [activeFaq, setActiveFaq] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContext, setSelectedContext] = useState('');

  // Валидация
  const handleNameChange = (e) => setFormData(prev => ({ ...prev, name: e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '') }));
  const handlePhoneChange = (e) => setFormData(prev => ({ ...prev, phone: e.target.value.replace(/[^0-9]/g, '').slice(0, 10) }));
  const handleYearChange = (e) => setFormData(prev => ({ ...prev, year: e.target.value.slice(0, 4) }));

  const scrollToCars = () => document.getElementById('cars-section')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToForm = () => document.getElementById('request-form')?.scrollIntoView({ behavior: 'smooth' });

  const openModal = (contextText) => {
    setSelectedContext(contextText);
    setIsModalOpen(true);
  };

  const sendFormToWhatsApp = (context = '') => {
    const { name, phone, brand, model, year } = formData;
    if (!name.trim() || phone.length < 10) {
      alert("Пожалуйста, заполните Имя и полный номер телефона");
      return;
    }
    const fullNumber = `+7 ${phone.slice(0,3)} ${phone.slice(3,6)} ${phone.slice(6,8)} ${phone.slice(8,10)}`;
    const contextText = context ? `%0A📌 Выбор: ${context}` : '';
    const message = `Заявка RusOne:${contextText}%0A👤 Имя: ${name}%0A📞 Тел: ${fullNumber}%0A🚗 Авто: ${brand} ${model} (${year})`;
    window.open(`https://wa.me/77077121104?text=${message}`, '_blank');
    setIsModalOpen(false); 
  };
  
  // Ссылки с готовыми сообщениями
  const waLink = `https://wa.me/77077121104?text=${encodeURIComponent(WA_MESSAGE)}`;
  const tgLink = `https://t.me/R1VKO?text=${encodeURIComponent(TG_MESSAGE)}`;

  return (
    <div className="min-h-screen w-full bg-[#020203] flex justify-center selection:bg-red-500/30 selection:text-white antialiased text-white font-russo relative">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');
        .font-russo { font-family: 'Russo One', sans-serif; }
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input::placeholder { color: rgba(255,255,255,0.4); text-transform: uppercase; font-size: 11px; }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes shimmer { 
          0% { transform: translateX(-100%) skewX(-15deg); } 
          100% { transform: translateX(200%) skewX(-15deg); } 
        }
      `}} />

      {/* Основной контейнер всегда шириной с телефон */}
      <main className="w-full max-w-[430px] mx-auto min-h-screen relative z-0 flex flex-col overflow-x-hidden border-x border-white/5 shadow-2xl shadow-black pb-4 bg-[#020203]">
        <BackgroundGlow />
        
        {/* === HEADER === */}
        <header className="sticky top-0 w-full h-16 z-[100] bg-black/80 backdrop-blur-xl flex items-center px-6 border-b border-white/5">
          <div className="w-10 flex justify-start">
            <a href="/" className="active:scale-90 transition-transform flex items-center justify-center">
            <img src="/R1/img/R1VKO.png" alt="RusOne Logo" />
            </a>
          </div>
          <div className="flex-1 flex justify-center">
            <a href="/" className="text-[18px] tracking-[0.2em] uppercase italic leading-none text-red-600">RusOne</a>
          </div>
          <div className="w-10 flex justify-end">
            <a href="https://www.instagram.com/rusonevko" target="_blank" rel="noreferrer" className="active:scale-90 transition-transform flex items-center justify-center">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="insta-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f09433" /><stop offset="25%" stopColor="#e6683c" />
                    <stop offset="50%" stopColor="#dc2743" /><stop offset="75%" stopColor="#cc2366" />
                    <stop offset="100%" stopColor="#bc1888" />
                  </linearGradient>
                </defs>
                <path fill="url(#insta-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </header>

        {/* === HERO === */}
        <section className="w-full relative min-h-[45vh] flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40">
              <source src="/video/car.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020203] to-transparent" />
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 flex flex-col items-center text-center px-7 pt-6">
            <div className="text-[10px] text-white/50 uppercase tracking-[0.3em] mb-3 font-medium">г. Усть-Каменогорск</div>
            
            <h1 className="text-[32px] tracking-normal leading-[1] uppercase italic">
              Профессиональная <br /> <span className="text-red-600">Русификация</span>
            </h1>
            <p className="mt-5 text-[12px] text-white/60 leading-relaxed max-w-[300px] uppercase tracking-wider">
              Полный перевод мультимедиа <br/> без потери гарантии
            </p>

            <div className="mt-8 relative group">
              <button type="button" onClick={scrollToCars} className="relative h-12 px-10 flex items-center justify-center rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md overflow-hidden active:scale-95 transition-transform">
                <motion.div 
                  animate={{ x: ['-200%', '200%'] }} 
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
                  className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-red-500/30 to-transparent skew-x-[-20deg]"
                />
                <span className="relative z-10 font-bold text-[11px] tracking-[0.2em] uppercase text-white">Узнать стоимость</span>
              </button>
            </div>
          </motion.div>
        </section>

        {/* === СТАТИСТИКА === */}
        <section className="px-5 mt-6 pb-6 relative z-20">
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3 text-center backdrop-blur-sm flex flex-col justify-center shadow-lg">
              <div className="text-red-500 text-[12px] tracking-widest font-normal mb-1">БЕЗ ПАЙКИ</div>
              <div className="text-[8px] text-white/50 uppercase tracking-widest mt-1">Сохраняем ЭБУ</div>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3 text-center backdrop-blur-sm flex flex-col justify-center shadow-lg">
              <div className="text-white text-[12px] tracking-widest font-normal mb-1">1-2 ЧАСА</div>
              <div className="text-[8px] text-white/50 uppercase tracking-widest mt-1">Время работы</div>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3 text-center backdrop-blur-sm flex flex-col justify-center shadow-lg">
              <div className="text-white text-[12px] tracking-widest font-normal mb-1">ВЫЕЗД</div>
              <div className="text-[8px] text-white/50 uppercase tracking-widest mt-1">К клиенту</div>
            </div>
          </div>
        </section>

        {/* === ФОРМА ЗАЯВКИ === */}
        <section id="request-form" className="px-5 mt-4 relative z-20">
          <div className="p-6 rounded-[28px] bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] relative focus-within:shadow-[0_0_40px_rgba(220,38,38,0.1)] transition-shadow duration-500">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[2px] bg-red-600 shadow-[0_0_15px_red]" />
            <h2 className="text-[14px] uppercase italic mb-6 text-center tracking-[0.2em] text-white">Оставить заявку</h2>
            
            <div className="space-y-3.5">
              <input type="text" value={formData.name} onChange={handleNameChange} placeholder="РУСЛАН" className="w-full h-12 bg-white/10 border border-white/20 rounded-xl px-4 outline-none focus:border-red-500/80 transition-all text-[13px] uppercase font-russo text-white placeholder:text-white/40" />
              <div className="relative flex items-center w-full h-12 bg-white/10 border border-white/20 rounded-xl px-4 focus-within:border-red-500/80 transition-all">
                <span className="text-[13px] font-russo text-white/60 mr-2">+7</span>
                <input type="tel" value={formData.phone} onChange={handlePhoneChange} placeholder="707 712 11 04" className="flex-1 bg-transparent outline-none text-[13px] font-russo text-white uppercase placeholder:text-white/40" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="text" value={formData.brand} onChange={(e) => setFormData(p => ({...p, brand: e.target.value}))} placeholder="МАРКА" className="w-full h-12 bg-white/10 border border-white/20 rounded-xl px-4 outline-none focus:border-red-500/80 text-[11px] uppercase font-russo text-white placeholder:text-white/40" />
                <input type="text" value={formData.model} onChange={(e) => setFormData(p => ({...p, model: e.target.value}))} placeholder="МОДЕЛЬ" className="w-full h-12 bg-white/10 border border-white/20 rounded-xl px-4 outline-none focus:border-red-500/80 text-[11px] uppercase font-russo text-white placeholder:text-white/40" />
              </div>
              <input type="number" value={formData.year} onChange={handleYearChange} placeholder="ГОД _ _ _ _" className="w-full h-12 bg-white/10 border border-white/20 rounded-xl px-4 outline-none focus:border-red-500/80 text-[11px] uppercase font-russo text-white placeholder:text-white/40" />
              
              <button type="button" onClick={() => sendFormToWhatsApp()} className="w-full h-14 mt-4 bg-red-600 active:scale-[0.97] transition-all rounded-xl font-bold tracking-[0.1em] text-[13px] uppercase shadow-[0_0_20px_rgba(220,38,38,0.4)] text-white">
                ОТПРАВИТЬ
              </button>
            </div>
          </div>
        </section>

        {/* === БЫЛО/СТАЛО (ДЕМОНСТРАЦИЯ) === */}
        <section className="px-5 pt-10 pb-8 relative z-20">
           <h2 className="text-[18px] uppercase italic tracking-[0.2em] text-white/90 text-center mb-6">Результат</h2>
           <TranslationDemo />
        </section>

        {/* === ПОЧЕМУ МЫ === */}
        <section className="px-5 py-12 relative z-20 overflow-hidden">
          <div className="text-center mb-8">
            <h2 className="text-[18px] uppercase italic tracking-[0.2em] text-white/90">Почему мы</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <motion.div initial={{ opacity: 0, y: -40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="col-span-2 p-5 rounded-[24px] bg-white/[0.04] border border-white/10 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20"><Wrench className="w-16 h-16 text-red-600" /></div>
              <h3 className="text-red-500 text-[14px] uppercase mb-2 tracking-wider relative z-10">Родной Русский</h3>
              <p className="text-[11px] text-white/60 leading-relaxed uppercase relative z-10">Идеальный перевод штатной системы. Никаких кривых шрифтов.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: 0.1 }} className="p-5 rounded-[24px] bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <div className="mb-4 w-8 h-8 rounded-lg bg-red-600/20 flex items-center justify-center"><Smartphone className="w-4 h-4 text-red-500" /></div>
              <h3 className="text-white text-[12px] uppercase mb-2 tracking-wider">Экосистема</h3>
              <p className="text-[10px] text-white/50 leading-tight uppercase">Яндекс, YouTube <br /> прямо в авто.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: 0.2 }} className="p-5 rounded-[24px] bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <div className="mb-4 w-8 h-8 rounded-lg bg-red-600/20 flex items-center justify-center"><ShieldCheck className="w-4 h-4 text-red-500" /></div>
              <h3 className="text-white text-[12px] uppercase mb-2 tracking-wider">Гарантия</h3>
              <p className="text-[10px] text-white/50 leading-tight uppercase">Сохранение <br /> дилерской гарантии.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: 0.3 }} className="col-span-2 p-5 rounded-[24px] bg-gradient-to-r from-red-950/40 to-transparent border border-white/10 backdrop-blur-md flex items-center justify-between">
              <div>
                <h3 className="text-white text-[13px] uppercase mb-1 tracking-wider italic">Работа на выезд</h3>
                <p className="text-[10px] text-white/50 uppercase leading-tight">Приедем в удобное место <br /> по всему Усть-Каменогорску.</p>
              </div>
              <div className="w-10 h-10 rounded-full border border-red-500/50 flex items-center justify-center animate-pulse shrink-0">
                <Headset className="w-5 h-5 text-red-500" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* === ТАРИФЫ === */}
        <section id="price" className="px-5 pb-12 relative z-20">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[18px] uppercase italic mb-8 tracking-[0.2em] text-center text-white/90">Тарифы</motion.h2>
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="p-6 rounded-[24px] bg-white/[0.04] border border-white/10 backdrop-blur-sm">
              <h3 className="text-[14px] text-white uppercase tracking-wider mb-2">Базовый</h3>
              <ul className="text-[10px] text-white/50 uppercase mb-4 space-y-1.5 leading-relaxed">
                <li>• Русификация мультимедиа</li>
              </ul>
              <div className="text-[24px] text-white mb-6">от 15 000 ₸</div>
              <button type="button" onClick={() => openModal('Тариф: Базовый')} className="w-full py-3 rounded-xl bg-white/10 border border-white/20 text-[11px] uppercase tracking-widest active:scale-95 transition-transform text-white">Выбрать</button>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} className="p-6 rounded-[24px] bg-red-950/20 backdrop-blur-sm relative overflow-visible group">
              <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[24px]" overflow="visible">
                  <rect x="0" y="0" width="100%" height="100%" rx="24" fill="none" stroke="rgba(255, 0, 0, 0.2)" strokeWidth="1" />
                  <rect x="0" y="0" width="100%" height="100%" rx="24" fill="none" stroke="#ff0000" strokeWidth="2.5" className="animate-border drop-shadow-[0_0_12px_rgba(255,0,0,1)]" />
              </svg>
              <div className="absolute top-5 right-5 px-3 py-1 bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)] text-white text-[10px] font-bold uppercase tracking-widest rounded-md z-10">ПРО</div>
              <h3 className="text-[14px] text-white uppercase tracking-wider mb-2 relative z-10">Всё включено</h3>
              <ul className="text-[10px] text-white/60 uppercase mb-4 space-y-1.5 leading-relaxed relative z-10">
                <li>• Мультимедиа</li>
                <li>• Приборная панель</li>
                <li>• Установка приложений</li>
              </ul>
              <div className="text-[24px] text-white mb-6 relative z-10">от 20 000 ₸</div>
              <button type="button" onClick={() => openModal('Тариф: ПРО (Всё включено)')} className="relative z-10 w-full py-3 rounded-xl bg-red-600 text-[11px] uppercase tracking-widest active:scale-95 transition-transform shadow-[0_0_20px_rgba(220,38,38,0.5)] text-white font-bold">Выбрать максимум</button>
            </motion.div>
          </div>
        </section>

        {/* === ЭТАПЫ РАБОТЫ (С ФОНОМ-ЛОГОТИПОМ) === */}
        <section className="px-5 py-12 relative z-20 border-t border-white/5 bg-gradient-to-b from-transparent to-black/40 overflow-hidden">
          {/* ФОНОВЫЙ ЛОГОТИП С БЛЮРОМ */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
             <img src="/img/R1VKO.png" alt="" className="w-[80%] h-auto object-contain opacity-10 blur-[3px]" />
          </div>
          
          <div className="text-center mb-10 relative z-10">
            <h2 className="text-[18px] uppercase italic tracking-[0.2em] text-white/90">Этапы работы</h2>
          </div>
          <div className="relative border-l-2 border-transparent ml-2 space-y-8 pl-8 pb-2 z-10">
            <motion.div 
              initial={{ height: 0 }} whileInView={{ height: '100%' }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-[-2px] top-0 w-[2px] bg-red-600 z-0" 
            />
            <div className="absolute left-[-2px] top-0 bottom-0 w-[2px] bg-white/10 z-[-1]" />
            {STEPS.map((step, idx) => {
              const isLast = idx === STEPS.length - 1;
              return (
                <motion.div key={idx} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.4 }} className="relative">
                  <div className="absolute -left-[45px] top-[-2px] w-6 h-6 bg-[#020203] border-2 border-red-600 rounded-full flex items-center justify-center z-10 shadow-[0_0_10px_rgba(220,38,38,0.5)]">
                     {isLast ? <CheckCircle2 className="w-3.5 h-3.5 text-red-500" /> : <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />}
                  </div>
                  <h3 className="text-[13px] uppercase tracking-wider text-white mb-1">{step.title}</h3>
                  <p className="text-[10px] text-white/50 uppercase leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* === АВТОМОБИЛИ === */}
        <section id="cars-section" className="py-12 border-y border-white/10 bg-black/60 z-20 scroll-mt-10">
          <h2 className="text-[18px] uppercase italic mb-8 text-center tracking-[0.2em] text-white px-5">Поддерживаемые авто</h2>
          <div className="flex overflow-x-auto hide-scroll px-5 gap-4 snap-x snap-mandatory pb-4">
            {CARS.map((car, idx) => (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.1 }} key={idx} className="min-w-[220px] snap-center shrink-0 bg-white/[0.03] border border-white/10 rounded-[24px] overflow-hidden flex flex-col">
                <div className="h-[130px] bg-white/5 relative flex items-center justify-center overflow-hidden p-2">
                   <img src={car.img} alt={car.model} className="w-full h-full object-cover opacity-80 transition-opacity hover:opacity-100" />
                </div>
                <div className="p-4 flex flex-col flex-1 justify-between">
                   <div>
                      <h3 className="text-[14px] text-white uppercase tracking-wider font-bold mb-1">{car.brand} <br/> {car.model}</h3>
                      <p className="text-[10px] text-white/40 tracking-widest uppercase mb-4">{car.desc}</p>
                   </div>
                   <button type="button" onClick={() => openModal(`Авто: ${car.brand} ${car.model}`)} className="w-full py-2.5 rounded-xl border border-white/20 text-[10px] text-white uppercase tracking-widest active:bg-white/10 transition-colors">
                      {car.price}
                   </button>
                </div>
              </motion.div>
            ))}
            
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="min-w-[220px] snap-center shrink-0 bg-white/[0.03] border border-white/10 rounded-[24px] overflow-hidden flex flex-col">
              <div className="h-[130px] bg-white/5 relative flex items-center justify-center overflow-hidden p-2">
                 <img src="/img/VasheAuto.png" alt="Ваше авто?" className="w-full h-full object-cover opacity-60" />
              </div>
              <div className="p-4 flex flex-col flex-1 justify-between">
                 <div>
                    <h3 className="text-[14px] text-red-500 uppercase tracking-wider font-bold mb-1">Ваше авто?</h3>
                    <p className="text-[10px] text-white/40 tracking-widest uppercase mb-4">Оставьте заявку</p>
                 </div>
                 <button type="button" onClick={scrollToForm} className="w-full py-2.5 rounded-xl bg-red-600/20 border border-red-500/50 text-[10px] text-red-400 uppercase tracking-widest active:bg-red-600/40 transition-colors">
                    Уточнить
                 </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* === ЧАСТЫЕ ВОПРОСЫ === */}
        <section className="px-5 py-12 z-20">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[18px] uppercase italic mb-8 tracking-[0.2em] text-center text-white/90">Частые вопросы</motion.h2>
          <div className="space-y-3">
            {FAQ.map((item, idx) => (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ delay: idx * 0.1 }} key={idx} className="border border-white/10 rounded-2xl bg-white/[0.04] overflow-hidden">
                <button type="button" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full px-5 py-4 flex items-center justify-between text-left">
                  <span className="text-[11px] uppercase tracking-wider text-white/90 pr-4 leading-relaxed">{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-red-500 transition-transform duration-300 shrink-0 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-5 pb-4 text-[10px] text-white/50 uppercase leading-relaxed">
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* === СВЯЗЬ С НАМИ === */}
        <section className="px-5 pt-4 pb-12 z-20 bg-gradient-to-t from-[#000] to-transparent">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[16px] uppercase italic mb-3 text-center tracking-[0.2em] text-white/90">Связь с нами</motion.h2>
          
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex justify-center mb-6">
            <a href="tel:+77077121104" className="flex items-center gap-2 text-white font-bold text-[22px] tracking-wider active:scale-95 transition-transform">
              <Phone className="w-5 h-5 text-red-500" /> +7 707 712 11 04
            </a>
          </motion.div>
            
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex justify-center gap-6">
            {/* WhatsApp с сообщением */}
            <a href={waLink} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center active:scale-95 transition-transform shadow-[0_0_20px_rgba(37,211,102,0.3)]">
              <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.305-.885-.653-1.48-1.459-1.653-1.756-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.446-.272.371-1.04 1.015-1.04 2.469 0 1.453 1.065 2.861 1.213 3.06.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            {/* Telegram с сообщением */}
            <a href={tgLink} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-[#229ED9] flex items-center justify-center active:scale-95 transition-transform shadow-[0_0_20px_rgba(34,158,217,0.3)]">
              <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 -ml-0.5">
                 <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/rusonevko" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center active:scale-95 transition-transform shadow-[0_0_20px_rgba(220,39,67,0.3)]">
              <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </motion.div>
        </section>

        {/* === МИНИМАЛИСТИЧНЫЙ ПОДВАЛ === */}
        <footer className="w-full mt-auto py-5 border-t border-white/10 bg-[#000] z-20">
           <div className="flex justify-between items-center text-[8px] text-white/30 uppercase tracking-widest font-russo w-full px-5">
             <span>© 2026 Все права защищены</span>
             <span>|</span>
             <span>Разработка и дизайн: SunQai</span>
           </div>
        </footer>

      </main>

      {/* === ПЛАВАЮЩАЯ КНОПКА WHATSAPP (С ГОТОВЫМ СООБЩЕНИЕМ) === */}
      <motion.div
        initial={{ y: 150 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 100 }}
        className="fixed bottom-6 left-0 right-0 z-[900] flex justify-center pointer-events-none"
      >
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="pointer-events-auto w-[calc(100%-40px)] max-w-[390px] h-14 bg-gradient-to-r from-[#25D366]/30 to-[#128C7E]/30 backdrop-blur-2xl border border-[#25D366]/40 rounded-full flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(37,211,102,0.2)] text-white font-bold tracking-widest uppercase text-[12px] active:scale-95 transition-transform"
        >
          <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 drop-shadow-md">
             <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.305-.885-.653-1.48-1.459-1.653-1.756-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.446-.272.371-1.04 1.015-1.04 2.469 0 1.453 1.065 2.861 1.213 3.06.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Написать в WhatsApp
        </a>
      </motion.div>

      {/* === МОДАЛЬНОЕ ОКНО === */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex flex-col justify-end p-4"
          >
            <motion.div 
              style={{ maxWidth: '400px' }}
              initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 200, opacity: 0 }}
              className="bg-[#050505] border border-white/10 w-full mx-auto rounded-[32px] p-6 relative shadow-[0_-10px_40px_rgba(220,38,38,0.15)] mb-20"
            >
              <button type="button" onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-white/10 rounded-full text-white/50 active:scale-90">
                <X className="w-4 h-4" />
              </button>
              
              <h2 className="text-[15px] uppercase italic mb-2 tracking-[0.1em] text-white pr-8">Оформление</h2>
              <p className="text-[10px] text-red-500 uppercase tracking-widest mb-6">{selectedContext}</p>
              
              <div className="space-y-3.5">
                <input type="text" value={formData.name} onChange={handleNameChange} placeholder="РУСЛАН" className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 outline-none focus:border-red-500/80 transition-all text-[13px] uppercase font-russo text-white placeholder:text-white/40" />
                <div className="relative flex items-center w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 focus-within:border-red-500/80 transition-all">
                  <span className="text-[13px] font-russo text-white/60 mr-2">+7</span>
                  <input type="tel" value={formData.phone} onChange={handlePhoneChange} placeholder="707 712 11 04" className="flex-1 bg-transparent outline-none text-[13px] font-russo text-white uppercase placeholder:text-white/40" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" value={formData.brand} onChange={(e) => setFormData(p => ({...p, brand: e.target.value}))} placeholder="МАРКА" className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 outline-none focus:border-red-500/80 text-[11px] uppercase font-russo text-white placeholder:text-white/40" />
                  <input type="text" value={formData.model} onChange={(e) => setFormData(p => ({...p, model: e.target.value}))} placeholder="МОДЕЛЬ" className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 outline-none focus:border-red-500/80 text-[11px] uppercase font-russo text-white placeholder:text-white/40" />
                </div>
                <input type="number" value={formData.year} onChange={handleYearChange} placeholder="ГОД _ _ _ _" className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 outline-none focus:border-red-500/80 text-[11px] uppercase font-russo text-white placeholder:text-white/40" />

                <button type="button" onClick={() => sendFormToWhatsApp(selectedContext)} className="w-full h-14 mt-4 bg-red-600 active:scale-[0.97] transition-all rounded-xl font-bold tracking-[0.1em] text-[13px] uppercase text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                  ОТПРАВИТЬ
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
