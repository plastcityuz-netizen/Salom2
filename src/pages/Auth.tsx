import { useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Building2, Factory, HardHat, MoreHorizontal, Store, Wrench } from "lucide-react";
import AuroraBackground from "../components/AuroraBackground";
import Logo from "../components/Logo";
import { login, register, setCompanyType, getUser, type CompanyType } from "../lib/auth";

function AuthShell({ children, title, sub }: { children: ReactNode; title: string; sub: string }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
      <AuroraBackground intensity={0.8} />
      <Link
        to="/"
        className="fixed left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-stroke bg-panel px-4 py-2 text-sm text-mute backdrop-blur-lg transition-colors hover:text-ink sm:left-6 sm:top-6"
      >
        <ArrowLeft size={14} /> Bosh sahifa
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong w-full max-w-md rounded-[28px] p-7 shadow-[var(--card-shadow)] sm:p-9"
      >
        <div className="mb-7 text-center">
          <div className="mb-5 flex justify-center">
            <Logo size={34} />
          </div>
          <h1 className="text-2xl font-extrabold">{title}</h1>
          <p className="mt-2 text-sm text-mute">{sub}</p>
        </div>
        {children}
      </motion.div>
    </div>
  );
}

export function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return setErr("To'g'ri email kiriting.");
    if (password.length < 4) return setErr("Parol kamida 4 belgidan iborat bo'lsin.");
    login(email, password);
    nav("/app");
  };

  return (
    <AuthShell title="Xush kelibsiz" sub="Hisobingizga kiring va biznesingizni boshqaring.">
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-mute" htmlFor="l-email">Email</label>
          <input id="l-email" type="email" className="field" placeholder="siz@kompaniya.uz" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-mute" htmlFor="l-pass">Parol</label>
          <input id="l-pass" type="password" className="field" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {err && <p className="text-xs font-medium text-bad">{err}</p>}
        <button type="submit" className="btn btn-primary w-full !py-3.5">
          Kirish <ArrowRight size={15} />
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-mute">
        Hisobingiz yo'qmi?{" "}
        <Link to="/register" className="font-semibold text-vio hover:underline">
          Bepul boshlang
        </Link>
      </p>
    </AuthShell>
  );
}

export function Register() {
  const nav = useNavigate();
  const [f, setF] = useState({ name: "", company: "", phone: "+998 ", email: "", password: "" });
  const [err, setErr] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (f.name.trim().length < 2) return setErr("Ismingizni kiriting.");
    if (f.company.trim().length < 2) return setErr("Kompaniya nomini kiriting.");
    if (!f.email.includes("@")) return setErr("To'g'ri email kiriting.");
    if (f.password.length < 6) return setErr("Parol kamida 6 belgidan iborat bo'lsin.");
    register({ name: f.name.trim(), company: f.company.trim(), phone: f.phone, email: f.email });
    nav("/onboarding");
  };

  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  return (
    <AuthShell title="30 kun bepul boshlang" sub="Karta talab qilinmaydi. 2 daqiqada tayyor.">
      <form onSubmit={submit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-mute" htmlFor="r-name">Ism</label>
            <input id="r-name" className="field" placeholder="Aziz Karimov" value={f.name} onChange={set("name")} required />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-mute" htmlFor="r-company">Kompaniya nomi</label>
            <input id="r-company" className="field" placeholder="Balans Trade MChJ" value={f.company} onChange={set("company")} required />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-mute" htmlFor="r-phone">Telefon</label>
          <input id="r-phone" type="tel" className="field" placeholder="+998 90 123 45 67" value={f.phone} onChange={set("phone")} required />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-mute" htmlFor="r-email">Email</label>
          <input id="r-email" type="email" className="field" placeholder="siz@kompaniya.uz" value={f.email} onChange={set("email")} required />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-mute" htmlFor="r-pass">Parol</label>
          <input id="r-pass" type="password" className="field" placeholder="Kamida 6 belgi" value={f.password} onChange={set("password")} required />
        </div>
        {err && <p className="text-xs font-medium text-bad">{err}</p>}
        <button type="submit" className="btn btn-primary w-full !py-3.5">
          Account yaratish <ArrowRight size={15} />
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-mute">
        Hisobingiz bormi?{" "}
        <Link to="/login" className="font-semibold text-vio hover:underline">
          Kirish
        </Link>
      </p>
    </AuthShell>
  );
}

const companyTypes: { id: CompanyType; label: string; desc: string; icon: typeof Store }[] = [
  { id: "savdo", label: "Savdo", desc: "Do'kon, optom, distribyutsiya", icon: Store },
  { id: "xizmat", label: "Xizmat", desc: "Servis, agentlik, konsalting", icon: Wrench },
  { id: "zavod", label: "Zavod", desc: "Ishlab chiqarish korxonasi", icon: Factory },
  { id: "qurilish", label: "Qurilish", desc: "Qurilish va pudrat", icon: HardHat },
  { id: "boshqa", label: "Boshqa", desc: "Boshqa faoliyat turi", icon: MoreHorizontal },
];

export function Onboarding() {
  const nav = useNavigate();
  const [sel, setSel] = useState<CompanyType | null>(null);
  const user = getUser();

  const done = () => {
    if (!sel) return;
    setCompanyType(sel);
    nav("/app");
  };

  return (
    <AuthShell
      title={`Xush kelibsiz, ${user?.name?.split(" ")[0] ?? "do'st"}!`}
      sub="Biznesingiz turini tanlang — platformani siz uchun moslaymiz."
    >
      <div className="space-y-2.5">
        {companyTypes.map((c) => (
          <button
            key={c.id}
            onClick={() => setSel(c.id)}
            className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
              sel === c.id
                ? "border-vio/60 bg-vio/[0.08] shadow-[0_8px_32px_-12px_var(--glow)]"
                : "border-stroke bg-panel hover:border-vio/30"
            }`}
            aria-pressed={sel === c.id}
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                sel === c.id ? "bg-gradient-to-br from-[#7c3aed] to-[#d946ef] text-white" : "bg-vio/10 text-vio"
              }`}
            >
              <c.icon size={17} />
            </span>
            <span>
              <span className="block text-sm font-bold">{c.label}</span>
              <span className="block text-xs text-faint">{c.desc}</span>
            </span>
          </button>
        ))}
      </div>
      <button onClick={done} disabled={!sel} className="btn btn-primary mt-6 w-full !py-3.5 disabled:cursor-not-allowed disabled:opacity-40">
        <Building2 size={15} /> Dashboardga o'tish <ArrowRight size={15} />
      </button>
    </AuthShell>
  );
}
