import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "uz" | "ru";

const dict: Record<string, { uz: string; ru: string }> = {
  // nav
  "nav.features": { uz: "Imkoniyatlar", ru: "Возможности" },
  "nav.aicfo": { uz: "AI CFO", ru: "AI CFO" },
  "nav.platform": { uz: "Platforma", ru: "Платформа" },
  "nav.pricing": { uz: "Tariflar", ru: "Тарифы" },
  "nav.about": { uz: "Biz haqimizda", ru: "О нас" },
  "nav.login": { uz: "Kirish", ru: "Войти" },
  "nav.start": { uz: "Bepul boshlash", ru: "Начать бесплатно" },
  // hero
  "hero.badge": { uz: "O'zbekiston bizneslari uchun AI Business Operating System", ru: "AI Business Operating System для бизнеса Узбекистана" },
  "hero.h1a": { uz: "Biznesingizni raqamlar emas,", ru: "Пусть бизнесом управляют" },
  "hero.h1b": { uz: "AI boshqarsin.", ru: "не цифры, а AI." },
  "hero.sub": {
    uz: "BALANS AI — O'zbekiston bizneslari uchun zamonaviy AI buxgalteriya va biznes boshqaruv platformasi. Buxgalteriyadan biznes qarorlarigacha — hammasi bitta platformada.",
    ru: "BALANS AI — современная платформа AI-бухгалтерии и управления бизнесом для Узбекистана. От бухгалтерии до бизнес-решений — всё на одной платформе.",
  },
  "hero.cta": { uz: "30 kun bepul sinab ko'rish", ru: "30 дней бесплатно" },
  "hero.cta2": { uz: "Platformani ko'rish", ru: "Смотреть платформу" },
  "hero.nocard": { uz: "Karta talab qilinmaydi", ru: "Карта не требуется" },
  // ai signal card
  "signal.title": { uz: "Bugungi biznesingiz holati", ru: "Состояние бизнеса сегодня" },
  "signal.found": { uz: "3 ta muhim signal aniqlandi", ru: "Обнаружено 3 важных сигнала" },
  "signal.1": { uz: "Xarajatlar 8.4% oshgan", ru: "Расходы выросли на 8.4%" },
  "signal.2": { uz: "3 ta mijozdan to'lov kechikmoqda", ru: "Платежи от 3 клиентов задерживаются" },
  "signal.3": { uz: "Ombordagi 2 mahsulot zaxirasi kamaymoqda", ru: "Запасы 2 товаров на складе заканчиваются" },
  "signal.cta": { uz: "Tavsiyani ko'rish", ru: "Смотреть рекомендацию" },
  // stats
  "stats.title": { uz: "Bitta platforma. Butun biznes.", ru: "Одна платформа. Весь бизнес." },
  "stats.sub": {
    uz: "Tarqoq Excel-fayllar va bir-biriga bog'lanmagan dasturlar o'rniga — yagona AI boshqaruv markazi.",
    ru: "Вместо разрозненных Excel-файлов и несвязанных программ — единый AI-центр управления.",
  },
  "stats.1l": { uz: "Markazlashgan ma'lumot", ru: "Централизованные данные" },
  "stats.2l": { uz: "AI monitoring", ru: "AI-мониторинг" },
  "stats.3v": { uz: "Real-time", ru: "Real-time" },
  "stats.3l": { uz: "Biznes ko'rsatkichlari", ru: "Показатели бизнеса" },
  "stats.4l": { uz: "Bepul sinov", ru: "Бесплатный период" },
  "stats.4v": { uz: "30 kun", ru: "30 дней" },
  // modules
  "mod.title": { uz: "Biznesingizning barcha jarayonlari — bitta tizimda", ru: "Все процессы вашего бизнеса — в одной системе" },
  "mod.sub": {
    uz: "Accounting + ERP + Business Intelligence + AI CFO + Automation. Har bir modul bir-biri bilan real vaqtda bog'langan.",
    ru: "Accounting + ERP + Business Intelligence + AI CFO + Automation. Каждый модуль связан с другими в реальном времени.",
  },
  // flow
  "flow.title": { uz: "BALANS AI qanday ishlaydi", ru: "Как работает BALANS AI" },
  "flow.sub": { uz: "Ma'lumotdan amaliy harakatgacha — to'rt bosqichli aqlli tizim.", ru: "От данных до действий — интеллектуальная система из четырёх шагов." },
  // cfo
  "cfo.title": { uz: "Sizning 24/7 AI CFO'ingiz", ru: "Ваш AI CFO 24/7" },
  "cfo.sub": { uz: "Raqamlarni shunchaki ko'rsatmaydi. Ularni tushuntiradi.", ru: "Не просто показывает цифры. Объясняет их." },
  "cfo.cta": { uz: "AI CFO bilan tanishish", ru: "Познакомиться с AI CFO" },
  // pricing
  "pricing.title": { uz: "Har bir biznes bosqichi uchun tarif", ru: "Тариф для каждого этапа бизнеса" },
  "pricing.sub": { uz: "Kichik do'kondan yirik zavodgacha — o'sishingizga mos keladigan reja.", ru: "От небольшого магазина до крупного завода — план, который растёт с вами." },
  // trial
  "trial.title": { uz: "Bugun boshlang. 30 kun bepul.", ru: "Начните сегодня. 30 дней бесплатно." },
  "trial.sub": { uz: "Karta talab qilinmaydi. 2 daqiqada account yarating va butun biznesingizni bitta ekranda ko'ring.", ru: "Карта не требуется. Создайте аккаунт за 2 минуты и увидьте весь бизнес на одном экране." },
  "trial.cta": { uz: "Bepul account yaratish", ru: "Создать бесплатный аккаунт" },
  // footer
  "footer.tag": { uz: "Biznesingizni raqamlar emas, AI boshqarsin.", ru: "Пусть бизнесом управляют не цифры, а AI." },
  "footer.help": { uz: "Yordam", ru: "Помощь" },
  "footer.privacy": { uz: "Maxfiylik", ru: "Конфиденциальность" },
  "footer.terms": { uz: "Foydalanish shartlari", ru: "Условия использования" },
};

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }>({
  lang: "uz",
  setLang: () => {},
  t: (k) => k,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return (localStorage.getItem("balans.lang") as Lang) || "uz";
    } catch {
      return "uz";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("balans.lang", lang);
    } catch {}
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (k: string) => dict[k]?.[lang] ?? dict[k]?.uz ?? k;

  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
