import { motion } from "framer-motion";
import { useParams, Navigate } from "react-router-dom";
import { Download, FileSpreadsheet, FileText, Plus } from "lucide-react";
import { LineChart, BarChart, Donut } from "../components/charts";
import { transactions, receivables, productionRows, employees, inventoryAlerts, salesWeekly, revenueSeries, expenseSeries, cashflowSeries, expenseBreakdown } from "../lib/data";

type Cell = { label: string; value: string; tone?: "good" | "warn" | "bad" };

interface ModuleConfig {
  title: string;
  desc: string;
  kpis: Cell[];
  chart: "line" | "bar" | "cash" | "donut";
  table: { head: string[]; rows: (string | { text: string; tone: string })[][] };
  action: string;
}

const cfg: Record<string, ModuleConfig> = {
  accounting: {
    title: "Buxgalteriya",
    desc: "Kirim, chiqim, balans va hisob-kitob — barchasi avtomatik jurnalda.",
    kpis: [
      { label: "Joriy oy kirim", value: "248.6 mln", tone: "good" },
      { label: "Joriy oy chiqim", value: "214.4 mln" },
      { label: "Balans", value: "+34.2 mln", tone: "good" },
      { label: "Ochiq hisob-fakturalar", value: "7 ta", tone: "warn" },
    ],
    chart: "line",
    table: {
      head: ["ID", "Kontragent", "Turi", "Sana", "Summa", "Holat"],
      rows: transactions.map((t) => [
        t.id, t.who, t.type, t.date, t.amount,
        { text: t.status, tone: t.status === "To'landi" ? "good" : t.status === "Kutilmoqda" ? "warn" : "bad" },
      ]),
    },
    action: "Yangi yozuv",
  },
  sales: {
    title: "Savdo",
    desc: "Sotuvlar, mijozlar va to'lovlar — real vaqtdagi savdo statistikasi bilan.",
    kpis: [
      { label: "Bu hafta savdo", value: "78.4 mln", tone: "good" },
      { label: "Buyurtmalar", value: "142 ta" },
      { label: "O'rtacha chek", value: "552 000" },
      { label: "Konversiya", value: "34%", tone: "good" },
    ],
    chart: "bar",
    table: {
      head: ["Mijoz", "Summa (so'm)", "Muddat", "Holat"],
      rows: receivables.map((r) => [r.client, r.amount, r.due, { text: r.risk === "good" ? "Rejada" : "Kechikkan", tone: r.risk }]),
    },
    action: "Yangi sotuv",
  },
  purchases: {
    title: "Xarid",
    desc: "Yetkazib beruvchilar, xarid buyurtmalari va xarajatlar nazorati.",
    kpis: [
      { label: "Ochiq buyurtmalar", value: "5 ta" },
      { label: "Bu oy xarid", value: "96.2 mln" },
      { label: "Kreditorlik", value: "31.8 mln", tone: "warn" },
      { label: "Yetkazib beruvchilar", value: "23 ta" },
    ],
    chart: "donut",
    table: {
      head: ["Yetkazib beruvchi", "Buyurtma", "Summa", "Holat"],
      rows: [
        ["UzPolimer Trade", "PO-311 · PP granula 6t", "51 000 000", { text: "Yo'lda", tone: "warn" }],
        ["Karton Servis MChJ", "PO-310 · Quti 12 000 dona", "18 400 000", { text: "Qabul qilindi", tone: "good" }],
        ["Etiketka Print", "PO-309 · Rulon 40 000", "6 800 000", { text: "Qabul qilindi", tone: "good" }],
        ["Toshkent Kimyo", "PO-308 · Bo'yoq 400kg", "9 200 000", { text: "Kutilmoqda", tone: "bad" }],
      ],
    },
    action: "Yangi buyurtma",
  },
  inventory: {
    title: "Ombor",
    desc: "Mahsulot qoldig'i, kirim-chiqim va inventar nazorati.",
    kpis: [
      { label: "Jami SKU", value: "1 240" },
      { label: "Ombor qiymati", value: "312 mln" },
      { label: "Kam zaxira", value: "3 ta", tone: "bad" },
      { label: "Aylanish", value: "18 kun", tone: "good" },
    ],
    chart: "bar",
    table: {
      head: ["Mahsulot", "Qoldiq", "Minimal", "Holat"],
      rows: [
        ...inventoryAlerts.map((a) => [a.name, a.left, a.min, { text: a.level < 0.35 ? "Kritik" : "Kam", tone: a.level < 0.35 ? "bad" : "warn" }]),
        ["PE quvur 32mm", "12 400 m", "4 000 m", { text: "Normal", tone: "good" }],
        ["Idish qopqog'i №4", "86 000 dona", "20 000 dona", { text: "Normal", tone: "good" }],
      ] as ModuleConfig["table"]["rows"],
    },
    action: "Kirim qilish",
  },
  production: {
    title: "Ishlab chiqarish",
    desc: "Xomashyo, tannarx va ishlab chiqarish rejasi — zavod nazorati.",
    kpis: [
      { label: "Reja bajarilishi", value: "94.2%", tone: "good" },
      { label: "O'rtacha tannarx", value: "8 420 so'm" },
      { label: "Brak darajasi", value: "1.3%", tone: "good" },
      { label: "Xomashyo zaxirasi", value: "9 kun", tone: "warn" },
    ],
    chart: "line",
    table: {
      head: ["Mahsulot", "Reja", "Fakt", "Tannarx"],
      rows: productionRows.map((p) => [p.name, p.plan, p.fact, p.cost]),
    },
    action: "Ish buyurtmasi",
  },
  finance: {
    title: "Moliya",
    desc: "Cash Flow, foyda, xarajat va qarzdorlik — moliyaviy sog'liq markazi.",
    kpis: [
      { label: "Cash Flow", value: "+34.2 mln", tone: "good" },
      { label: "Sof foyda", value: "80.4 mln", tone: "good" },
      { label: "Debitorlik", value: "50.4 mln", tone: "warn" },
      { label: "Kreditorlik", value: "31.8 mln" },
    ],
    chart: "cash",
    table: {
      head: ["Mijoz", "Summa (so'm)", "Muddat", "Risk"],
      rows: receivables.map((r) => [r.client, r.amount, r.due, { text: r.risk === "good" ? "Past" : r.risk === "warn" ? "O'rta" : "Yuqori", tone: r.risk }]),
    },
    action: "To'lov qo'shish",
  },
  hr: {
    title: "HR",
    desc: "Xodimlar, ish vaqti, maosh va vazifalar boshqaruvi.",
    kpis: [
      { label: "Xodimlar", value: "46 ta" },
      { label: "Bugun ishda", value: "41 ta", tone: "good" },
      { label: "Oylik fond", value: "312 mln" },
      { label: "Ochiq vakansiya", value: "3 ta" },
    ],
    chart: "bar",
    table: {
      head: ["Xodim", "Lavozim", "Holat", "Maosh"],
      rows: employees.map((e) => [e.name, e.role, { text: e.status, tone: e.status === "Ishda" ? "good" : "warn" }, e.salary]),
    },
    action: "Xodim qo'shish",
  },
};

const toneColor: Record<string, string> = { good: "var(--good)", warn: "var(--warn)", bad: "var(--bad)" };

export default function ModulePage() {
  const { module } = useParams();
  const c = module ? cfg[module] : undefined;
  if (!c) return <Navigate to="/app" replace />;

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-end justify-between gap-3 px-1 pt-2">
        <div>
          <h1 className="text-xl font-extrabold sm:text-2xl">{c.title}</h1>
          <p className="mt-1 text-sm text-mute">{c.desc}</p>
        </div>
        <button className="btn btn-primary !px-5 !py-2.5 !text-sm">
          <Plus size={14} /> {c.action}
        </button>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {c.kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="card p-4 sm:p-5"
          >
            <p className="text-xs text-faint">{k.label}</p>
            <p className="ticker mt-1.5 text-lg font-extrabold sm:text-xl" style={k.tone ? { color: toneColor[k.tone] } : undefined}>
              {k.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-5 lg:col-span-2">
          <p className="mb-3 text-sm font-bold">Dinamika</p>
          <div className="h-48">
            {c.chart === "line" && <LineChart data={revenueSeries} data2={expenseSeries} />}
            {c.chart === "bar" && <BarChart data={salesWeekly} />}
            {c.chart === "cash" && <BarChart data={cashflowSeries} color="var(--blue)" />}
            {c.chart === "donut" && (
              <div className="flex h-full items-center justify-center gap-8">
                <Donut size={150} thickness={15} segments={expenseBreakdown} center="96.2" centerSub="mln so'm" />
                <div className="space-y-1.5 text-xs text-mute">
                  {expenseBreakdown.map((e) => (
                    <p key={e.label}>
                      <span className="mr-1.5 inline-block h-2 w-2 rounded-full" style={{ background: e.color }} />
                      {e.label} — {e.value}%
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }} className="card p-5">
          <p className="mb-3 text-sm font-bold">Eksport</p>
          <div className="space-y-2.5">
            {[
              { icon: FileText, l: "PDF hisobot" },
              { icon: FileSpreadsheet, l: "Excel jadval" },
              { icon: Download, l: "CSV ma'lumot" },
            ].map((b) => (
              <button key={b.l} className="btn btn-ghost w-full justify-start !rounded-xl !py-3 !text-sm">
                <b.icon size={15} className="text-vio" /> {b.l}
              </button>
            ))}
          </div>
          <p className="mt-4 rounded-xl border border-vio/25 bg-vio/[0.06] p-3 text-xs leading-relaxed text-mute">
            <span className="font-semibold text-vio">AI:</span> Ushbu modul bo'yicha haftalik xulosa har dushanba 09:00 da tayyor bo'ladi.
          </p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }} className="card overflow-hidden p-5">
        <p className="mb-3 text-sm font-bold">Ro'yxat</p>
        <div className="-mx-5 overflow-x-auto px-5">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-faint">
                {c.table.head.map((h) => (
                  <th key={h} className="pb-2 pr-4 font-semibold last:text-right">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.table.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-stroke/60 transition-colors hover:bg-panel">
                  {row.map((cell, ci) => (
                    <td key={ci} className={`py-3 pr-4 ${ci === 0 ? "font-medium" : "text-mute"} ${ci === row.length - 1 ? "text-right" : ""}`}>
                      {typeof cell === "string" ? (
                        <span className={/^[+\-\d]/.test(cell) ? "ticker" : ""}>{cell}</span>
                      ) : (
                        <span
                          className="rounded-full px-2.5 py-1 text-[10px] font-semibold"
                          style={{ color: toneColor[cell.tone], background: `color-mix(in srgb, ${toneColor[cell.tone]} 12%, transparent)` }}
                        >
                          {cell.text}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
