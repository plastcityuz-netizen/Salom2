import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowDownRight, ArrowRight, ArrowUpRight, BrainCircuit, Package, Sparkles } from "lucide-react";
import { LineChart, BarChart, Donut, Spark } from "../components/charts";
import { kpis, revenueSeries, expenseSeries, cashflowSeries, transactions, inventoryAlerts, aiInsights, expenseBreakdown } from "../lib/data";
import { getUser } from "../lib/auth";

const toneColor: Record<string, string> = { bad: "var(--bad)", warn: "var(--warn)", good: "var(--good)" };

const stagger = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } }),
};

export default function DashboardPage() {
  const user = getUser();

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <motion.div variants={stagger} initial="hidden" animate="show" custom={0} className="flex flex-wrap items-end justify-between gap-3 px-1 pt-2">
        <div>
          <h1 className="text-xl font-extrabold sm:text-2xl">
            Assalomu alaykum, {user?.name?.split(" ")[0] ?? "do'st"} 👋
          </h1>
          <p className="mt-1 text-sm text-mute">Bugungi biznesingiz holati — barcha modullar bo'yicha real vaqt.</p>
        </div>
        <Link to="/app/ai-cfo" className="btn btn-primary !px-5 !py-2.5 !text-sm">
          <Sparkles size={14} /> AI xulosani ko'rish
        </Link>
      </motion.div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((k, i) => (
          <motion.div key={k.key} variants={stagger} initial="hidden" animate="show" custom={i + 1} className="card p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs text-faint">{k.label}</p>
              <span className={`flex items-center gap-0.5 text-[11px] font-semibold ${k.up ? "text-good" : "text-warn"}`}>
                {k.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {k.delta}
              </span>
            </div>
            <div className="mt-2 flex items-end justify-between gap-2">
              <p className="ticker text-lg font-extrabold sm:text-xl">{k.value}</p>
              <Spark data={k.spark} w={64} h={24} color={k.up ? "var(--good)" : "var(--warn)"} />
            </div>
            <p className="mt-1 text-[10px] text-faint">so'm · joriy oy</p>
          </motion.div>
        ))}
      </div>

      {/* charts row */}
      <div className="grid gap-3 lg:grid-cols-3">
        <motion.div variants={stagger} initial="hidden" animate="show" custom={5} className="card p-5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold">Tushum va xarajat dinamikasi</p>
              <p className="text-xs text-faint">Oxirgi 12 oy, mln so'm</p>
            </div>
            <div className="flex gap-4 text-xs text-mute">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-vio" />Tushum</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-cyan" />Xarajat</span>
            </div>
          </div>
          <div className="h-48 sm:h-56">
            <LineChart data={revenueSeries} data2={expenseSeries} />
          </div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate="show" custom={6} className="card flex flex-col p-5">
          <p className="text-sm font-bold">Xarajat tarkibi</p>
          <p className="text-xs text-faint">Joriy oy</p>
          <div className="flex flex-1 items-center justify-center py-3">
            <Donut size={150} thickness={15} segments={expenseBreakdown} center="168.2" centerSub="mln so'm" />
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-[11px] text-mute">
            {expenseBreakdown.map((e) => (
              <p key={e.label}>
                <span className="mr-1.5 inline-block h-2 w-2 rounded-full" style={{ background: e.color }} />
                {e.label} {e.value}%
              </p>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI insights + cashflow */}
      <div className="grid gap-3 lg:grid-cols-3">
        <motion.div variants={stagger} initial="hidden" animate="show" custom={7} className="card relative overflow-hidden p-5 lg:col-span-2">
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{ background: "radial-gradient(80% 60% at 100% 0%, rgba(168,85,247,0.12), transparent 60%)" }}
          />
          <div className="relative mb-4 flex items-center justify-between">
            <p className="flex items-center gap-2 text-sm font-bold">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#d946ef] text-white">
                <BrainCircuit size={14} />
              </span>
              AI Insights
            </p>
            <Link to="/app/ai-cfo" className="flex items-center gap-1 text-xs font-semibold text-vio hover:underline">
              Barchasi <ArrowRight size={12} />
            </Link>
          </div>
          <div className="relative space-y-2.5">
            {aiInsights.map((a, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-stroke bg-panel p-3.5">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: toneColor[a.tone] }} />
                <div>
                  <p className="text-sm font-semibold">{a.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-mute">{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate="show" custom={8} className="card p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-bold">Cash Flow</p>
            <span className="text-xs font-semibold text-good">+34.2 mln</span>
          </div>
          <div className="h-36">
            <BarChart data={cashflowSeries} color="var(--blue)" />
          </div>
          <div className="mt-4 space-y-2 border-t border-stroke pt-3 text-xs">
            <div className="flex justify-between"><span className="text-mute">Kirim</span><span className="ticker font-semibold text-good">+248.6 mln</span></div>
            <div className="flex justify-between"><span className="text-mute">Chiqim</span><span className="ticker font-semibold text-bad">-214.4 mln</span></div>
            <div className="flex justify-between font-bold"><span>Sof oqim</span><span className="ticker text-grad">+34.2 mln</span></div>
          </div>
        </motion.div>
      </div>

      {/* transactions + inventory alerts */}
      <div className="grid gap-3 lg:grid-cols-3">
        <motion.div variants={stagger} initial="hidden" animate="show" custom={9} className="card overflow-hidden p-5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-bold">So'nggi tranzaksiyalar</p>
            <Link to="/app/accounting" className="flex items-center gap-1 text-xs font-semibold text-vio hover:underline">
              Hammasi <ArrowRight size={12} />
            </Link>
          </div>
          <div className="-mx-5 overflow-x-auto px-5">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-faint">
                  <th className="pb-2 font-semibold">ID</th>
                  <th className="pb-2 font-semibold">Kontragent</th>
                  <th className="pb-2 font-semibold">Sana</th>
                  <th className="pb-2 text-right font-semibold">Summa</th>
                  <th className="pb-2 text-right font-semibold">Holat</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} className="border-t border-stroke/60 transition-colors hover:bg-panel">
                    <td className="py-2.5 text-xs text-faint">{t.id}</td>
                    <td className="py-2.5 font-medium">{t.who}</td>
                    <td className="py-2.5 text-xs text-mute">{t.date}</td>
                    <td className={`ticker py-2.5 text-right font-semibold ${t.amount.startsWith("+") ? "text-good" : "text-ink"}`}>{t.amount}</td>
                    <td className="py-2.5 text-right">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                          t.status === "To'landi"
                            ? "bg-good/10 text-good"
                            : t.status === "Kutilmoqda"
                              ? "bg-warn/10 text-warn"
                              : "bg-bad/10 text-bad"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate="show" custom={10} className="card p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="flex items-center gap-2 text-sm font-bold">
              <Package size={14} className="text-warn" /> Ombor ogohlantirishlari
            </p>
          </div>
          <div className="space-y-3">
            {inventoryAlerts.map((a) => (
              <div key={a.name} className="rounded-xl border border-stroke bg-panel p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-semibold leading-snug">{a.name}</p>
                  <AlertTriangle size={13} className={a.level < 0.35 ? "text-bad" : "text-warn"} />
                </div>
                <p className="mt-1 text-[11px] text-faint">Qoldiq: {a.left} · Min: {a.min}</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stroke">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: a.level < 0.35 ? "var(--bad)" : "var(--warn)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${a.level * 100}%` }}
                    transition={{ duration: 0.9, delay: 0.4 }}
                  />
                </div>
              </div>
            ))}
            <Link to="/app/inventory" className="btn btn-ghost w-full !py-2.5 !text-xs">
              Omborga o'tish <ArrowRight size={12} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
