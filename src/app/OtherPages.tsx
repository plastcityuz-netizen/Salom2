import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Download, FileSpreadsheet, FileText, Globe, Moon, Shield, Sun, User } from "lucide-react";
import { getUser } from "../lib/auth";
import { useTheme } from "../lib/theme";
import { useLang } from "../lib/i18n";

/* ================= REPORTS ================= */
const reportList = [
  { name: "Foyda va zarar (P&L)", desc: "Daromad, tannarx va sof foyda", time: "1.2s" },
  { name: "Balance Sheet", desc: "Aktiv, passiv va kapital holati", time: "1.5s" },
  { name: "Cash Flow", desc: "Pul oqimi — operatsion, invest, moliyaviy", time: "0.9s" },
  { name: "Savdo hisoboti", desc: "Mahsulot, mijoz va menejer kesimida", time: "1.1s" },
  { name: "Xarajatlar", desc: "Kategoriya va davr bo'yicha", time: "0.8s" },
  { name: "Ombor hisoboti", desc: "Qoldiq, aylanish va harakat", time: "1.3s" },
  { name: "Debitorlik", desc: "Mijozlar qarzdorligi va muddatlar", time: "0.7s" },
  { name: "Kreditorlik", desc: "Yetkazib beruvchilarga qarzlar", time: "0.7s" },
  { name: "Ishlab chiqarish", desc: "Reja/fakt, tannarx va material sarfi", time: "1.6s" },
  { name: "Soliq hisobotlari", desc: "Soliq bazasi bo'yicha ma'lumotlar", time: "2.1s" },
];

export function ReportsPage() {
  const [generated, setGenerated] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="px-1 pt-2">
        <h1 className="text-xl font-extrabold sm:text-2xl">Hisobotlar</h1>
        <p className="mt-1 text-sm text-mute">Murakkab hisobotlarni bir necha soniyada oling — PDF, Excel yoki CSV formatida.</p>
      </motion.div>

      <div className="grid gap-3 sm:grid-cols-2">
        {reportList.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card card-hover flex items-center justify-between gap-4 p-5"
          >
            <div className="flex items-center gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-vio/10 text-vio">
                <FileText size={18} />
              </span>
              <div>
                <p className="text-sm font-bold">{r.name}</p>
                <p className="text-xs text-faint">{r.desc}</p>
                {generated === r.name && (
                  <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-good">
                    <Check size={11} /> Tayyor · {r.time}
                  </p>
                )}
              </div>
            </div>
            <div className="flex shrink-0 gap-1.5">
              {[FileText, FileSpreadsheet, Download].map((Icon, j) => (
                <button
                  key={j}
                  onClick={() => setGenerated(r.name)}
                  aria-label={["PDF", "Excel", "CSV"][j] + " yuklab olish"}
                  title={["PDF", "Excel", "CSV"][j]}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-stroke text-mute transition-all hover:border-vio/40 hover:text-vio"
                >
                  <Icon size={13} />
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ================= SETTINGS ================= */
export function SettingsPage() {
  const user = getUser();
  const { theme, toggle } = useTheme();
  const { lang, setLang } = useLang();

  const typeLabel: Record<string, string> = {
    savdo: "Savdo", xizmat: "Xizmat", zavod: "Zavod", qurilish: "Qurilish", boshqa: "Boshqa",
  };

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="px-1 pt-2">
        <h1 className="text-xl font-extrabold sm:text-2xl">Sozlamalar</h1>
        <p className="mt-1 text-sm text-mute">Profil, kompaniya va platforma sozlamalari.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="card p-6">
        <p className="mb-4 flex items-center gap-2 text-sm font-bold">
          <User size={15} className="text-vio" /> Profil
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Ism", user?.name ?? "—"],
            ["Email", user?.email ?? "—"],
            ["Telefon", user?.phone ?? "—"],
            ["Kompaniya", user?.company ?? "—"],
            ["Biznes turi", typeLabel[user?.companyType ?? ""] ?? "—"],
            ["Tarif", "TEKIN · Trial (27 kun qoldi)"],
          ].map(([l, v]) => (
            <div key={l} className="rounded-xl border border-stroke bg-panel px-4 py-3">
              <p className="text-[11px] text-faint">{l}</p>
              <p className="mt-0.5 truncate text-sm font-semibold">{v}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="card p-6">
        <p className="mb-4 flex items-center gap-2 text-sm font-bold">
          <Globe size={15} className="text-vio" /> Interfeys
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <p className="mb-2 text-xs text-faint">Til</p>
            <div className="flex overflow-hidden rounded-full border border-stroke text-xs font-semibold">
              {(["uz", "ru"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-4 py-2.5 uppercase transition-colors ${lang === l ? "bg-vio/20 text-ink" : "text-faint"}`}
                >
                  {l === "uz" ? "O'zbek" : "Русский"}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs text-faint">Rejim</p>
            <button onClick={toggle} className="btn btn-ghost !px-5 !py-2.5 !text-sm">
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              {theme === "dark" ? "Light rejimga o'tish" : "Dark rejimga o'tish"}
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="card p-6">
        <p className="mb-4 flex items-center gap-2 text-sm font-bold">
          <Shield size={15} className="text-vio" /> Rollar va ruxsatlar
        </p>
        <div className="space-y-2">
          {[
            ["Owner", "Butun biznes — siz", true],
            ["Buxgalter", "Moliya va accounting", false],
            ["Sales", "Savdo va mijozlar", false],
            ["Warehouse", "Ombor va inventar", false],
          ].map(([r, d, me]) => (
            <div key={r as string} className="flex items-center justify-between rounded-xl border border-stroke bg-panel px-4 py-3">
              <div>
                <p className="text-sm font-semibold">
                  {r as string}
                  {me ? <span className="ml-2 rounded-full bg-vio/15 px-2 py-0.5 text-[10px] font-bold text-vio">SIZ</span> : null}
                </p>
                <p className="text-[11px] text-faint">{d as string}</p>
              </div>
              <button className="text-xs font-semibold text-vio hover:underline">{me ? "Faol" : "Taklif qilish"}</button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
