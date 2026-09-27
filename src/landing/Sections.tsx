import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, BadgeDollarSign, BarChart3, BrainCircuit, Boxes, Calculator, Database,
  Factory, Landmark, LineChart as LineIcon, Send, ShoppingCart, Sparkles, Users, Zap,
} from "lucide-react";
import { Reveal, Counter } from "../components/Reveal";
import { useLang } from "../lib/i18n";

/* ================= STATS ================= */
export function Stats() {
  const { t } = useLang();
  return (
    <section className="px-4 py-20 sm:py-28" id="biz">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <span className="eyebrow">Nega BALANS AI</span>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold sm:text-5xl">{t("stats.title")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-mute">{t("stats.sub")}</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { v: <Counter to={100} suffix="%" />, l: t("stats.1l"), icon: Database },
            { v: <span className="ticker">24/7</span>, l: t("stats.2l"), icon: BrainCircuit },
            { v: t("stats.3v"), l: t("stats.3l"), icon: Zap },
            { v: <Counter to={30} suffix=" kun" />, l: t("stats.4l"), icon: Sparkles },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="card card-hover flex flex-col items-center gap-2 px-4 py-8 text-center">
                <s.icon size={20} className="mb-1 text-vio" />
                <div className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
                  {s.v}
                </div>
                <p className="text-sm text-mute">{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= MODULES ================= */
const modules = [
  { icon: Calculator, name: "Buxgalteriya", desc: "Kirim, chiqim, balans, hisob-kitob va moliyaviy nazorat." },
  { icon: ShoppingCart, name: "Savdo", desc: "Sotuvlar, mijozlar, to'lovlar va savdo statistikasi." },
  { icon: Boxes, name: "Ombor", desc: "Mahsulot qoldig'i, kirim-chiqim va inventar nazorati." },
  { icon: BadgeDollarSign, name: "Xarid", desc: "Yetkazib beruvchilar, xaridlar va xarajatlarni boshqarish." },
  { icon: Factory, name: "Ishlab chiqarish", desc: "Xomashyo, ishlab chiqarish, tannarx va tayyor mahsulot." },
  { icon: Users, name: "HR", desc: "Xodimlar, ish vaqti, maosh va vazifalarni boshqarish." },
  { icon: Landmark, name: "Moliya", desc: "Cash Flow, foyda, xarajat va qarzdorlik." },
  { icon: BrainCircuit, name: "AI CFO", desc: "Biznes ma'lumotlarini tahlil qilib, amaliy tavsiyalar beradi.", hot: true },
];

export function Modules() {
  const { t } = useLang();
  return (
    <section className="px-4 py-20 sm:py-28" id="modullar">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <span className="eyebrow">Modullar</span>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-extrabold sm:text-5xl">{t("mod.title")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-mute">{t("mod.sub")}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((m, i) => (
            <Reveal key={m.name} delay={(i % 4) * 0.07}>
              <div className={`card card-hover group relative h-full overflow-hidden p-6 ${m.hot ? "border-vio/30" : ""}`}>
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(circle, rgba(168,85,247,0.25), transparent 70%)" }}
                />
                <span
                  className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-stroke transition-colors duration-300 group-hover:border-vio/40 ${
                    m.hot ? "bg-gradient-to-br from-[#7c3aed] to-[#d946ef] text-white" : "bg-panel text-vio"
                  }`}
                >
                  <m.icon size={19} />
                </span>
                <h3 className="text-[17px] font-bold">
                  {m.name}
                  {m.hot && <span className="ml-2 rounded-full bg-vio/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-vio">Asosiy farq</span>}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= AI CFO ================= */
export function AiCfoSection() {
  const { t } = useLang();
  const nav = useNavigate();
  return (
    <section className="px-4 py-20 sm:py-28" id="ai-cfo">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow">Asosiy farqlovchi</span>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">{t("cfo.title")}</h2>
          <p className="mt-4 text-lg text-mute">{t("cfo.sub")}</p>
          <ul className="mt-8 space-y-4">
            {[
              "Har kuni ertalab biznes holati bo'yicha qisqa xulosa",
              "Foyda, xarajat va cash flow o'zgarishlarining sabablarini tushuntiradi",
              "Kechikkan to'lovlar va zaxira xatarlari bo'yicha ogohlantiradi",
              "Keyingi qadam uchun aniq, amaliy tavsiya beradi",
            ].map((x, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px] text-mute">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-vio/15 text-vio">
                  <Sparkles size={11} />
                </span>
                {x}
              </li>
            ))}
          </ul>
          <button onClick={() => nav("/register")} className="btn btn-primary mt-9">
            {t("cfo.cta")} <ArrowRight size={16} />
          </button>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-6 rounded-[36px] opacity-50 blur-3xl"
              style={{ background: "radial-gradient(60% 60% at 50% 40%, rgba(168,85,247,0.28), transparent)" }}
            />
            <div className="glass-strong relative rounded-[26px] p-5 shadow-[var(--card-shadow)] sm:p-6">
              <div className="flex items-center gap-3 border-b border-stroke pb-4">
                <span className="ai-breathe flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#d946ef] text-white">
                  <BrainCircuit size={18} />
                </span>
                <div>
                  <p className="font-bold">AI CFO</p>
                  <p className="flex items-center gap-1.5 text-xs text-faint">
                    <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-good" /> Onlayn — ma'lumotlar real vaqtda
                  </p>
                </div>
              </div>

              <div className="space-y-4 py-5">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-br from-[#7c3aed] to-[#a855f7] px-4 py-3 text-sm text-white"
                >
                  Bu oy nega foydam kamaydi?
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="w-fit max-w-[92%] rounded-2xl rounded-bl-md border border-stroke bg-panel px-4 py-3 text-sm leading-relaxed text-mute"
                >
                  Foyda o'tgan oyga nisbatan <span className="font-semibold text-bad">7.8% kamaygan</span>. Asosiy sabablar:
                  marketing xarajatlarining oshishi va ikki yirik mijoz to'lovlarining kechikishi.
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="rounded-2xl border border-vio/30 bg-vio/[0.07] p-4"
                >
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-vio">
                    <Sparkles size={13} /> AI tavsiyasi
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-mute">
                    Marketing xarajatlarini <span className="font-semibold text-ink">10% optimallashtirish</span> va kechikkan{" "}
                    <span className="font-semibold text-ink">2 ta invoice</span> bo'yicha reminder yuborish.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <span className="rounded-full bg-vio/15 px-3 py-1.5 text-xs font-semibold text-vio">Reminder yuborish</span>
                    <span className="rounded-full border border-stroke px-3 py-1.5 text-xs text-mute">Batafsil tahlil</span>
                  </div>
                </motion.div>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-stroke bg-panel px-4 py-3">
                <span className="flex-1 text-sm text-faint">Biznesingiz haqida savol bering…</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#7c3aed] to-[#d946ef] text-white">
                  <Send size={13} />
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= FLOW ================= */
const steps = [
  { n: "01", t: "DATA", d: "Biznesingizdan barcha ma'lumotlar yig'iladi — savdo, xarajat, ombor, ishlab chiqarish.", icon: Database },
  { n: "02", t: "AI TAHLIL", d: "AI ma'lumotlarni analiz qiladi, trend va anomaliyalarni topadi.", icon: BrainCircuit },
  { n: "03", t: "QAROR", d: "Muammo va imkoniyatlarni aniq raqamlar bilan ko'rsatadi.", icon: LineIcon },
  { n: "04", t: "HARAKAT", d: "Amaliy tavsiya va keyingi qadamni beradi — siz faqat tasdiqlaysiz.", icon: Zap },
];

export function Flow() {
  const { t } = useLang();
  return (
    <section className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <span className="eyebrow">Ish prinsipi</span>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">{t("flow.title")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-mute">{t("flow.sub")}</p>
        </Reveal>

        <div className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-5">
          {/* connecting line with flowing particles (desktop) */}
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-[52px] hidden h-px lg:block">
            <div className="h-full w-full bg-gradient-to-r from-transparent via-vio/40 to-transparent" />
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-mag"
                style={{ boxShadow: "0 0 10px var(--mag)" }}
                animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 4, delay: i * 1.3, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </div>

          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12} className="relative">
              <div className="card card-hover relative flex h-full flex-col items-center p-7 text-center">
                <span className="relative mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-3xl border border-vio/30 bg-panel">
                  <s.icon size={26} className="text-vio" />
                  <motion.span
                    className="absolute inset-0 rounded-3xl border border-vio/50"
                    animate={{ opacity: [0.15, 0.6, 0.15], scale: [1, 1.08, 1] }}
                    transition={{ duration: 3, delay: i * 0.6, repeat: Infinity }}
                  />
                </span>
                <span className="text-[11px] font-bold tracking-[0.3em] text-faint">{s.n}</span>
                <h3 className="mt-1 text-xl font-extrabold tracking-wide text-grad">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{s.d}</p>
              </div>
              {i < 3 && (
                <div className="mt-6 flex justify-center lg:hidden">
                  <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
                    <ArrowRight size={18} className="rotate-90 text-vio/60" />
                  </motion.div>
                </div>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-12 text-center">
          <p className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-stroke px-6 py-3 text-sm font-semibold tracking-wide text-mute">
            <BarChart3 size={15} className="text-vio" />
            DATA <ArrowRight size={13} className="text-faint" /> AI TAHLIL <ArrowRight size={13} className="text-faint" /> QAROR{" "}
            <ArrowRight size={13} className="text-faint" /> HARAKAT
          </p>
        </Reveal>
      </div>
    </section>
  );
}
