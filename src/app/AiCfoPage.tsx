import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Send, Sparkles } from "lucide-react";
import { getUser } from "../lib/auth";

interface Msg {
  role: "user" | "ai";
  text: string;
  tip?: string;
}

/** Kelajakda real AI API bilan almashtiriladi (src/lib/api.ts). */
function aiAnswer(q: string): Msg {
  const s = q.toLowerCase();
  if (s.includes("foyda")) {
    return {
      role: "ai",
      text: "Foyda o'tgan oyga nisbatan 7.8% kamaygan. Asosiy sabablar: marketing xarajatlarining oshishi (+11%) va ikki yirik mijoz to'lovlarining kechikishi (jami 21.9 mln so'm).",
      tip: "Marketing xarajatlarini 10% optimallashtirish va kechikkan 2 ta invoice bo'yicha reminder yuborish.",
    };
  }
  if (s.includes("xarajat")) {
    return {
      role: "ai",
      text: "Joriy oy xarajatlari 168.2 mln so'm — o'tgan oyga nisbatan 8.4% yuqori. Eng katta o'sish: logistika (+14%) va reklama (+11%). Xomashyo xarajati barqaror.",
      tip: "Logistika bo'yicha 2 ta muqobil yetkazib beruvchidan narx so'rovi yuborish tavsiya etiladi.",
    };
  }
  if (s.includes("qarz") || s.includes("debitor") || s.includes("to'lov")) {
    return {
      role: "ai",
      text: "Debitorlik qarzi 50.4 mln so'm. Shundan 28.4 mln so'm muddati o'tgan: Mega Retail (9.8 mln, 3 kun), Chirchiq Savdo (12.15 mln, 6 kun), Baraka Trade (6.45 mln, 1 kun).",
      tip: "Chirchiq Savdo bo'yicha telefon qo'ng'irog'i, qolganlariga avtomatik reminder yuborish.",
    };
  }
  if (s.includes("ombor") || s.includes("zaxira") || s.includes("mahsulot")) {
    return {
      role: "ai",
      text: "Ombordagi 3 ta pozitsiya minimal darajadan past: PP-500 granula (420 kg), Karton quti 40×40 (180 dona), Etiketka rulon (2 400 dona). PP-500 bo'yicha talab +22% o'smoqda.",
      tip: "PP-500 bo'yicha xarid buyurtmasini bugun berish — yetkazish 7-9 kun davom etadi.",
    };
  }
  if (s.includes("savdo") || s.includes("sotuv")) {
    return {
      role: "ai",
      text: "Bu hafta savdo 78.4 mln so'm (+18%). Eng yaxshi kun — juma. Top mahsulot: PP-500 granula. Yangi mijozlar soni: 6 ta.",
      tip: "Juma kunlari uchun qo'shimcha aksiya sinab ko'rish — konversiya yana 4-6% oshishi mumkin.",
    };
  }
  return {
    role: "ai",
    text: "Biznesingiz umumiy holati barqaror: tushum +12.4%, sof foyda 80.4 mln so'm. Diqqat talab qiladigan 3 ta signal bor: xarajatlar o'sishi, 3 ta kechikkan to'lov va 2 ta mahsulot zaxirasi.",
    tip: "\"Foyda\", \"xarajat\", \"qarzdorlik\", \"ombor\" yoki \"savdo\" haqida so'rang — chuqur tahlil beraman.",
  };
}

const suggestions = [
  "Bu oy nega foydam kamaydi?",
  "Xarajatlarim qanday o'zgardi?",
  "Kimlardan qarzdorlik bor?",
  "Ombor holati qanday?",
];

export default function AiCfoPage() {
  const user = getUser();
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "ai",
      text: `Assalomu alaykum, ${user?.name?.split(" ")[0] ?? "do'st"}! Men sizning AI CFO'ingizman. Bugun ${new Date().toLocaleDateString("uz-UZ")} holatiga ko'ra 3 ta muhim signal aniqladim. Nimadan boshlaymiz?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, typing]);

  const ask = (q: string) => {
    if (!q.trim() || typing) return;
    setMsgs((m) => [...m, { role: "user", text: q.trim() }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, aiAnswer(q)]);
      setTyping(false);
    }, 1100);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col" style={{ minHeight: "calc(100vh - 190px)" }}>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-4 flex items-center gap-3 px-1 pt-2">
        <span className="ai-breathe flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#d946ef] text-white">
          <BrainCircuit size={20} />
        </span>
        <div>
          <h1 className="text-xl font-extrabold">AI CFO</h1>
          <p className="flex items-center gap-1.5 text-xs text-faint">
            <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-good" /> Onlayn — biznes ma'lumotlaringiz real vaqtda ulangan
          </p>
        </div>
      </motion.div>

      <div className="card flex flex-1 flex-col overflow-hidden !rounded-[26px]">
        <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
          <AnimatePresence initial={false}>
            {msgs.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                {m.role === "user" ? (
                  <div className="max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-br from-[#7c3aed] to-[#a855f7] px-4 py-3 text-sm text-white">
                    {m.text}
                  </div>
                ) : (
                  <div className="max-w-[92%] space-y-2.5">
                    <div className="rounded-2xl rounded-bl-md border border-stroke bg-panel px-4 py-3 text-sm leading-relaxed text-mute">
                      {m.text}
                    </div>
                    {m.tip && (
                      <div className="rounded-2xl border border-vio/30 bg-vio/[0.07] px-4 py-3">
                        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-vio">
                          <Sparkles size={11} /> AI tavsiyasi
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-mute">{m.tip}</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5 rounded-2xl border border-stroke bg-panel px-4 py-3 w-fit">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-vio"
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                  transition={{ duration: 0.9, delay: i * 0.15, repeat: Infinity }}
                />
              ))}
            </motion.div>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t border-stroke p-3 sm:p-4">
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => ask(s)}
                className="shrink-0 rounded-full border border-stroke bg-panel px-3.5 py-2 text-xs text-mute transition-all hover:border-vio/40 hover:text-ink"
              >
                {s}
              </button>
            ))}
          </div>
          <form onSubmit={submit} className="flex items-center gap-2">
            <input
              className="field !rounded-full"
              placeholder="Biznesingiz haqida savol bering…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="AI CFO ga savol"
            />
            <button
              type="submit"
              aria-label="Yuborish"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7c3aed] to-[#d946ef] text-white transition-transform hover:scale-105 active:scale-95"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
