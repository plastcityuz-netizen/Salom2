import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ArrowRight, ArrowUpRight, Bell, BrainCircuit, CheckCircle2, Package, Sparkles, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useLang } from "../lib/i18n";
import { LineChart, BarChart, Donut, Spark } from "../components/charts";
import { revenueSeries, expenseSeries, cashflowSeries } from "../lib/data";

export default function Hero() {
  const { t } = useLang();
  const nav = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const dashY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const dashRotate = useTransform(scrollYProgress, [0, 1], [0, 4]);
  const dashScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  return (
    <section ref={ref} className="relative overflow-hidden px-4 pt-36 pb-10 sm:pt-44 sm:pb-16" id="hero">
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass mb-7 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-mute sm:text-[13px]"
        >
          <Sparkles size={13} className="text-vio" />
          {t("hero.badge")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl text-[40px] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-[76px]"
        >
          {t("hero.h1a")}
          <br />
          <span className="text-grad">{t("hero.h1b")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-mute sm:text-lg"
        >
          {t("hero.sub")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <button onClick={() => nav("/register")} className="btn btn-primary !px-8 !py-4 !text-base">
            {t("hero.cta")}
            <ArrowRight size={17} />
          </button>
          <a href="#platforma" className="btn btn-ghost !px-7 !py-4 !text-base">
            {t("hero.cta2")}
            <ArrowUpRight size={16} />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="mt-4 flex items-center gap-1.5 text-xs text-faint"
        >
          <CheckCircle2 size={13} className="text-good" /> {t("hero.nocard")}
        </motion.p>

        {/* ---------- floating product preview ---------- */}
        <motion.div
          style={{ y: dashY, rotateX: dashRotate, scale: dashScale, transformPerspective: 1400 }}
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-16 w-full max-w-5xl sm:mt-20"
        >
          <div
            className="pointer-events-none absolute -inset-x-10 -top-16 h-48 opacity-60 blur-3xl"
            style={{ background: "radial-gradient(50% 100% at 50% 100%, rgba(168,85,247,0.35), transparent)" }}
          />

          <div className="glass-strong relative overflow-hidden rounded-[26px] text-left shadow-[var(--card-shadow)]">
            {/* window chrome */}
            <div className="flex items-center justify-between border-b border-stroke px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-bad/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-good/70" />
                </div>
                <span className="hidden text-xs text-faint sm:block">app.balans.ai — Boshqaruv paneli</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-mute">
                <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-good" /> Live
                <Bell size={13} className="ml-2 text-faint" />
              </div>
            </div>

            <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[1fr_290px]">
              <div className="space-y-4">
                {/* KPI row */}
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {[
                    { icon: TrendingUp, label: "Tushum", val: "248.6 mln", d: "+12.4%", up: true, data: [4, 6, 5, 8, 7, 9, 8, 10] },
                    { icon: TrendingDown, label: "Xarajatlar", val: "168.2 mln", d: "+8.4%", up: false, data: [5, 5, 6, 6, 7, 7, 8, 8] },
                    { icon: Wallet, label: "Sof foyda", val: "80.4 mln", d: "+6.1%", up: true, data: [3, 4, 3, 5, 5, 6, 5, 7] },
                    { icon: Package, label: "Ombor", val: "1 240 SKU", d: "3 alert", up: false, data: [6, 5, 6, 5, 4, 5, 4, 4] },
                  ].map((k) => (
                    <div key={k.label} className="rounded-2xl border border-stroke bg-panel p-3.5">
                      <div className="flex items-center justify-between text-[11px] text-faint">
                        <span className="flex items-center gap-1.5">
                          <k.icon size={12} className="text-vio" /> {k.label}
                        </span>
                        <span className={k.up ? "text-good" : "text-warn"}>{k.d}</span>
                      </div>
                      <div className="mt-1.5 flex items-end justify-between gap-1">
                        <span className="ticker text-[15px] font-bold sm:text-base">{k.val}</span>
                        <Spark data={k.data} w={52} h={20} color={k.up ? "var(--good)" : "var(--warn)"} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* charts */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-stroke bg-panel p-4">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-semibold">Tushum va xarajat</span>
                      <span className="text-faint">12 oy</span>
                    </div>
                    <div className="h-28">
                      <LineChart data={revenueSeries} data2={expenseSeries} />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-stroke bg-panel p-4">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-semibold">Cash Flow</span>
                      <span className="text-faint">Oylik</span>
                    </div>
                    <div className="h-28">
                      <BarChart data={cashflowSeries} color="var(--blue)" />
                    </div>
                  </div>
                </div>

                {/* bottom row */}
                <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
                  <div className="flex items-center gap-4 rounded-2xl border border-stroke bg-panel p-4">
                    <Donut
                      size={92}
                      thickness={10}
                      segments={[
                        { value: 38, color: "var(--vio)" },
                        { value: 27, color: "var(--mag)" },
                        { value: 21, color: "var(--blue)" },
                        { value: 14, color: "var(--cyan)" },
                      ]}
                      center="68%"
                    />
                    <div className="space-y-1 text-[11px] text-mute">
                      <p className="font-semibold text-ink">Debitor / Kreditor</p>
                      <p><span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-vio" />Debitorlik — 50.4 mln</p>
                      <p><span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-mag" />Kreditorlik — 31.8 mln</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-stroke bg-panel p-4">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-semibold">Savdo — bu hafta</span>
                      <span className="text-good">+18%</span>
                    </div>
                    <div className="h-16">
                      <BarChart data={[42, 58, 51, 66, 72, 60, 78]} color="var(--vio)" />
                    </div>
                  </div>
                </div>
              </div>

              {/* AI CFO side panel */}
              <AiSignalPanel />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AiSignalPanel() {
  const { t } = useLang();
  const signals = [
    { icon: TrendingDown, text: t("signal.1"), tone: "var(--bad)" },
    { icon: Bell, text: t("signal.2"), tone: "var(--warn)" },
    { icon: Package, text: t("signal.3"), tone: "var(--cyan)" },
  ];

  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-vio/25 bg-panel p-4">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ background: "radial-gradient(120% 60% at 100% 0%, rgba(168,85,247,0.18), transparent 60%)" }}
      />
      <div className="relative flex items-center gap-2.5">
        <span className="ai-breathe flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#d946ef] text-white">
          <BrainCircuit size={17} />
        </span>
        <div>
          <p className="text-sm font-bold">AI CFO</p>
          <p className="text-[11px] text-faint">{t("signal.title")}</p>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="relative mt-4 text-xs font-semibold text-vio"
      >
        {t("signal.found")}
      </motion.p>

      <div className="relative mt-2.5 flex-1 space-y-2">
        {signals.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8 + i * 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-2.5 rounded-xl border border-stroke bg-bg2/40 p-2.5"
          >
            <s.icon size={14} style={{ color: s.tone }} className="mt-0.5 shrink-0" />
            <p className="text-[12px] leading-snug text-mute">
              <span className="font-semibold text-ink">{i + 1}.</span> {s.text}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.a
        href="#ai-cfo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="relative mt-3 flex items-center justify-center gap-1.5 rounded-xl border border-vio/40 py-2.5 text-xs font-semibold text-vio transition-all hover:bg-vio/10"
      >
        {t("signal.cta")} <ArrowRight size={13} />
      </motion.a>
    </div>
  );
}
