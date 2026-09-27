import { motion } from "framer-motion";
import {
  AlertTriangle, ArrowDownRight, ArrowUpRight, Boxes, CircleDollarSign, ClipboardList,
  Cog, Download, Factory, FileSpreadsheet, FileText, Gauge, Layers, Lock,
  PackageCheck, ShieldCheck, Table, TrendingUp, Users2, Wallet,
} from "lucide-react";
import { Reveal } from "../components/Reveal";
import { LineChart, BarChart, Donut } from "../components/charts";
import { revenueSeries, expenseSeries, salesWeekly, expenseBreakdown } from "../lib/data";

/* ================= DASHBOARD SHOWCASE ================= */
export function DashboardShowcase() {
  return (
    <section className="px-4 py-20 sm:py-28" id="platforma">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <span className="eyebrow">Platforma</span>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">Butun biznesingiz — bir qarashda</h2>
          <p className="mx-auto mt-4 max-w-2xl text-mute">
            Tushum, xarajat, foyda, cash flow, savdo, ombor, debitor va kreditorlik — hammasi real vaqtda, AI ogohlantirishlari bilan.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="glass-strong mt-12 overflow-hidden rounded-[26px] shadow-[var(--card-shadow)]">
            <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-stroke bg-panel p-5 lg:col-span-2">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold">Tushum dinamikasi</p>
                    <p className="text-xs text-faint">Yanvar — Dekabr, mln so'm</p>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-good/10 px-2.5 py-1 text-xs font-semibold text-good">
                    <ArrowUpRight size={12} /> +12.4%
                  </span>
                </div>
                <div className="h-44 sm:h-52">
                  <LineChart data={revenueSeries} data2={expenseSeries} />
                </div>
                <div className="mt-3 flex gap-5 text-xs text-mute">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-vio" /> Tushum</span>
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-cyan" /> Xarajat</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-1 items-center justify-between gap-3 rounded-2xl border border-stroke bg-panel p-5">
                  <div>
                    <p className="text-sm font-bold">Xarajat tarkibi</p>
                    <div className="mt-2 space-y-1 text-[11px] text-mute">
                      {expenseBreakdown.slice(0, 4).map((e) => (
                        <p key={e.label}>
                          <span className="mr-1.5 inline-block h-2 w-2 rounded-full" style={{ background: e.color }} />
                          {e.label} — {e.value}%
                        </p>
                      ))}
                    </div>
                  </div>
                  <Donut size={110} thickness={12} segments={expenseBreakdown} center="168" centerSub="mln so'm" />
                </div>
                <div className="rounded-2xl border border-stroke bg-panel p-5">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <p className="font-bold">Savdo — hafta</p>
                    <span className="text-xs font-semibold text-good">+18%</span>
                  </div>
                  <div className="h-20">
                    <BarChart data={salesWeekly} />
                  </div>
                </div>
              </div>

              {[
                { icon: Wallet, l: "Sof foyda", v: "80.4 mln", d: "+6.1%", up: true },
                { icon: CircleDollarSign, l: "Debitorlik", v: "50.4 mln", d: "4 mijoz", up: false },
                { icon: ClipboardList, l: "Kreditorlik", v: "31.8 mln", d: "2 hisob", up: true },
              ].map((k) => (
                <div key={k.l} className="flex items-center justify-between rounded-2xl border border-stroke bg-panel p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-vio/10 text-vio">
                      <k.icon size={18} />
                    </span>
                    <div>
                      <p className="text-xs text-faint">{k.l}</p>
                      <p className="ticker text-lg font-bold">{k.v}</p>
                    </div>
                  </div>
                  <span className={`flex items-center gap-1 text-xs font-semibold ${k.up ? "text-good" : "text-warn"}`}>
                    {k.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />} {k.d}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= MANUFACTURING ================= */
export function Manufacturing() {
  const items = [
    { icon: Layers, t: "Xomashyo" },
    { icon: Cog, t: "Ishlab chiqarish" },
    { icon: PackageCheck, t: "Tayyor mahsulot" },
    { icon: CircleDollarSign, t: "Tannarx" },
    { icon: Boxes, t: "Ombor" },
    { icon: ClipboardList, t: "Ishlab chiqarish rejasi" },
    { icon: Gauge, t: "Material sarfi" },
    { icon: TrendingUp, t: "Production analytics" },
  ];

  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <div className="glass-strong rounded-[26px] p-5 shadow-[var(--card-shadow)] sm:p-6">
            <div className="flex items-center justify-between border-b border-stroke pb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-vio/10 text-vio">
                  <Factory size={18} />
                </span>
                <div>
                  <p className="font-bold">Ishlab chiqarish paneli</p>
                  <p className="text-xs text-faint">Sentyabr — real vaqt</p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-good/10 px-3 py-1 text-xs font-semibold text-good">
                <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-good" /> Liniya faol
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 py-4">
              {[
                { l: "Reja bajarilishi", v: "94.2%" },
                { l: "O'rtacha tannarx", v: "8 420" },
                { l: "Brak darajasi", v: "1.3%" },
              ].map((x) => (
                <div key={x.l} className="rounded-xl border border-stroke bg-panel p-3 text-center">
                  <p className="ticker text-lg font-extrabold text-grad">{x.v}</p>
                  <p className="mt-1 text-[10px] leading-tight text-faint">{x.l}</p>
                </div>
              ))}
            </div>

            {[
              { n: "PP-500 granula", f: "11 460 / 12 000 kg", p: 95 },
              { n: "PE quvur 32mm", f: "8 120 / 8 500 m", p: 95 },
              { n: "Idish qopqog'i №4", f: "33 800 / 40 000 dona", p: 84 },
            ].map((r, i) => (
              <div key={r.n} className="mb-3 rounded-xl border border-stroke bg-panel p-3.5">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-semibold">{r.n}</span>
                  <span className="text-faint">{r.f}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-stroke">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] to-[#d946ef]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${r.p}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            ))}

            <div className="mt-1 flex items-center gap-2 rounded-xl border border-warn/30 bg-warn/[0.07] p-3 text-xs text-mute">
              <AlertTriangle size={14} className="shrink-0 text-warn" />
              Xomashyo zaxirasi (PP granula) joriy sur'atda <span className="font-semibold text-ink">9 kunga</span> yetadi.
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <span className="eyebrow">Ishlab chiqarish</span>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">Zavodlar uchun ham tayyor.</h2>
          <p className="mt-4 text-lg text-mute">
            BALANS AI faqat kichik biznes uchun emas. Xomashyodan tayyor mahsulotgacha butun ishlab chiqarish zanjiri —
            tannarx hisobi va reja nazorati bilan.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {items.map((x, i) => (
              <Reveal key={x.t} delay={i * 0.05}>
                <div className="card card-hover flex items-center gap-3 rounded-2xl px-4 py-3.5">
                  <x.icon size={17} className="shrink-0 text-vio" />
                  <span className="text-sm font-medium">{x.t}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= ROLES ================= */
const roles = [
  { r: "Owner", d: "Butun biznes — barcha modullar va hisobotlar", icon: ShieldCheck, w: 100 },
  { r: "Buxgalter", d: "Moliya va accounting", icon: FileText, w: 62 },
  { r: "Manager", d: "Savdo, mijozlar va jamoa ko'rsatkichlari", icon: Users2, w: 55 },
  { r: "Sales", d: "Savdo va mijozlar", icon: TrendingUp, w: 40 },
  { r: "Warehouse", d: "Ombor va inventar", icon: Boxes, w: 34 },
  { r: "HR", d: "Xodimlar va ish haqi", icon: Users2, w: 30 },
  { r: "Production", d: "Ishlab chiqarish va xomashyo", icon: Factory, w: 38 },
];

export function Roles() {
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <span className="eyebrow">Xavfsizlik va rollar</span>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold sm:text-5xl">
            Har kim faqat o'ziga kerakli ma'lumotni ko'radi.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-mute">
            Role-based access control: har bir rol uchun aniq permission tizimi. Ma'lumotlaringiz shifrlangan va nazorat ostida.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {roles.map((x, i) => (
            <Reveal key={x.r} delay={i * 0.06}>
              <div className="card card-hover flex items-center gap-4 px-5 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-vio/10 text-vio">
                  <x.icon size={17} />
                </span>
                <div className="w-28 shrink-0 sm:w-36">
                  <p className="text-sm font-bold">{x.r}</p>
                  <p className="hidden text-[11px] text-faint sm:block">{x.d}</p>
                </div>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stroke">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#d946ef]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${x.w}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <span className="ticker w-12 shrink-0 text-right text-xs font-semibold text-mute">{x.w}%</span>
                <Lock size={13} className="shrink-0 text-faint" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= REPORTS ================= */
const reports = [
  "P&L", "Balance Sheet", "Cash Flow", "Savdo", "Xarajatlar",
  "Ombor", "Debitorlik", "Kreditorlik", "Ishlab chiqarish", "Soliq hisobotlari",
];

export function ReportsSection() {
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow">Hisobotlar</span>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">Murakkab hisobotlarni bir necha soniyada oling.</h2>
          <p className="mt-4 text-lg text-mute">
            Buxgalter bir hafta tayyorlaydigan hisobotlar — bitta tugma bilan. Har doim yangi, har doim aniq.
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {reports.map((r, i) => (
              <Reveal key={r} delay={i * 0.04}>
                <span className="card card-hover inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium">
                  <Table size={13} className="text-vio" /> {r}
                </span>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { icon: FileText, l: "PDF" },
              { icon: FileSpreadsheet, l: "Excel" },
              { icon: Download, l: "CSV" },
            ].map((b) => (
              <button key={b.l} className="btn btn-ghost !px-5 !py-3 !text-sm">
                <b.icon size={15} className="text-vio" /> {b.l} export
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="glass-strong rounded-[26px] p-5 shadow-[var(--card-shadow)] sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-bold">Foyda va zarar (P&L)</p>
                <p className="text-xs text-faint">2025 Q3 — avtomatik shakllantirilgan</p>
              </div>
              <span className="rounded-full bg-good/10 px-3 py-1 text-xs font-semibold text-good">Tayyor · 1.2s</span>
            </div>
            {[
              { l: "Yalpi tushum", v: "744.2 mln", strong: true },
              { l: "Sotilgan mahsulot tannarxi", v: "-421.6 mln" },
              { l: "Yalpi foyda", v: "322.6 mln", strong: true },
              { l: "Operatsion xarajatlar", v: "-186.4 mln" },
              { l: "Soliqlar", v: "-24.9 mln" },
              { l: "Sof foyda", v: "111.3 mln", grad: true },
            ].map((r, i) => (
              <motion.div
                key={r.l}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.45 }}
                className={`flex items-center justify-between border-b border-stroke py-3 text-sm last:border-0 ${
                  r.grad ? "mt-1 rounded-xl border-0 bg-vio/[0.08] px-3" : ""
                }`}
              >
                <span className={r.strong || r.grad ? "font-semibold" : "text-mute"}>{r.l}</span>
                <span className={`ticker font-semibold ${r.grad ? "text-grad text-base" : r.v.startsWith("-") ? "text-mute" : ""}`}>
                  {r.v} so'm
                </span>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= AI ALERTS ================= */
export function Alerts() {
  const alerts = [
    { tone: "bad", tag: "Muhim", text: "Xarajatlar 12% oshdi.", sub: "Logistika va reklama bo'yicha o'sish o'tgan 3 oy o'rtachasidan yuqori.", time: "Hozir" },
    { tone: "warn", tag: "Diqqat", text: "3 ta invoice muddati o'tgan.", sub: "Jami 28.4 mln so'm — reminder yuborish tavsiya etiladi.", time: "12 daqiqa oldin" },
    { tone: "good", tag: "Imkoniyat", text: "Eng ko'p sotilayotgan mahsulot bo'yicha zaxira kamaymoqda.", sub: "PP-500: talab +22%. Xarid buyurtmasini bugun bering.", time: "1 soat oldin" },
  ];
  const toneColor: Record<string, string> = { bad: "var(--bad)", warn: "var(--warn)", good: "var(--good)" };

  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <span className="eyebrow">AI ogohlantirishlar</span>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold sm:text-5xl">
            Muammoni siz sezishdan oldin AI sezadi.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-mute">
            AI CFO biznesingizni 24/7 kuzatib boradi va muhim o'zgarishlar haqida darhol xabar beradi.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 max-w-2xl space-y-4">
          {alerts.map((a, i) => (
            <Reveal key={a.tag} delay={i * 0.12}>
              <div className="card card-hover relative overflow-hidden p-5">
                <span className="absolute inset-y-3 left-0 w-[3px] rounded-full" style={{ background: toneColor[a.tone] }} />
                <div className="flex items-start justify-between gap-4 pl-3">
                  <div>
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider"
                      style={{ color: toneColor[a.tone], background: `color-mix(in srgb, ${toneColor[a.tone]} 12%, transparent)` }}
                    >
                      <span className="dot-pulse h-1.5 w-1.5 rounded-full" style={{ background: toneColor[a.tone] }} />
                      {a.tag}
                    </span>
                    <p className="mt-2.5 font-semibold">{a.text}</p>
                    <p className="mt-1 text-sm text-mute">{a.sub}</p>
                  </div>
                  <span className="shrink-0 text-[11px] text-faint">{a.time}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
