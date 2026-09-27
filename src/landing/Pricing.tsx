import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, Crown, Rocket, Sparkles } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { useLang } from "../lib/i18n";
import Logo from "../components/Logo";
import { Send, Instagram, Linkedin } from "lucide-react";

/* ================= PRICING ================= */
const plans = [
  {
    name: "TEKIN",
    price: "0 so'm",
    period: "30 kunlik trial",
    desc: "Platformani to'liq his qilish uchun boshlang'ich reja.",
    icon: Rocket,
    features: ["Basic accounting", "Savdo moduli", "Basic inventory", "Basic dashboard", "Limited AI"],
    cta: "Bepul boshlash",
    highlight: false,
  },
  {
    name: "PREMIUM",
    price: "490 000 so'm",
    period: "oyiga / kompaniya",
    desc: "O'zbekiston bizneslari uchun asosiy tarif.",
    icon: Sparkles,
    features: ["Full accounting", "Savdo va mijozlar", "Ombor (inventory)", "Moliya va Cash Flow", "Barcha hisobotlar", "AI CFO", "Jamoa boshqaruvi", "Advanced analytics"],
    cta: "Premium boshlash",
    highlight: true,
  },
  {
    name: "PREMIUM PLUS",
    price: "990 000 so'm",
    period: "oyiga / kompaniya",
    desc: "Katta kompaniyalar va zavodlar uchun.",
    icon: Crown,
    features: ["Barcha Premium funksiyalar", "Advanced AI CFO", "Manufacturing moduli", "Advanced analytics", "Advanced permissions", "Automation", "Priority support"],
    cta: "Premium Plus",
    highlight: false,
    plus: true,
  },
];

export function Pricing() {
  const { t } = useLang();
  const nav = useNavigate();

  return (
    <section className="px-4 py-20 sm:py-28" id="tariflar">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <span className="eyebrow">Tariflar</span>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold sm:text-5xl">{t("pricing.title")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-mute">{t("pricing.sub")}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div
                className={`card card-hover relative flex h-full flex-col p-7 ${
                  p.highlight ? "border-vio/40 shadow-[0_24px_80px_-24px_rgba(139,92,246,0.4)]" : ""
                } ${p.plus ? "border-mag/25" : ""}`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#d946ef] px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    Eng ommabop
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                      p.highlight || p.plus ? "bg-gradient-to-br from-[#7c3aed] to-[#d946ef] text-white" : "bg-vio/10 text-vio"
                    }`}
                  >
                    <p.icon size={19} />
                  </span>
                  <h3 className="text-lg font-extrabold tracking-wide">{p.name}</h3>
                </div>

                <div className="mt-6">
                  <p className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                    {p.price}
                  </p>
                  <p className="mt-1 text-xs text-faint">{p.period}</p>
                </div>
                <p className="mt-3 text-sm text-mute">{p.desc}</p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-mute">
                      <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-good/15 text-good">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => nav("/register")}
                  className={`btn mt-8 w-full ${p.highlight ? "btn-primary" : "btn-ghost"}`}
                >
                  {p.cta} <ArrowRight size={15} />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= TRIAL CTA ================= */
export function TrialCta() {
  const { t } = useLang();
  const nav = useNavigate();

  return (
    <section className="px-4 py-20 sm:py-28">
      <Reveal>
        <div className="glass-strong relative mx-auto max-w-4xl overflow-hidden rounded-[32px] px-6 py-16 text-center sm:px-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(70% 90% at 50% 110%, rgba(168,85,247,0.28), transparent 65%), radial-gradient(45% 60% at 85% 0%, rgba(96,165,250,0.14), transparent)",
            }}
          />
          <div className="relative">
            <h2 className="text-3xl font-extrabold sm:text-5xl">{t("trial.title")}</h2>
            <p className="mx-auto mt-4 max-w-lg text-mute sm:text-lg">{t("trial.sub")}</p>
            <button onClick={() => nav("/register")} className="btn btn-primary mt-9 !px-9 !py-4 !text-base">
              {t("trial.cta")} <ArrowRight size={17} />
            </button>
            <p className="mt-4 text-xs text-faint">Karta talab qilinmaydi · 2 daqiqada sozlanadi · Istalgan vaqtda bekor qilish mumkin</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ================= FOOTER ================= */
export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stroke px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-mute">{t("footer.tag")}</p>
            <div className="mt-5 flex gap-2.5">
              {[
                { icon: Send, label: "Telegram" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#hero"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-stroke text-mute transition-all hover:border-vio/50 hover:text-vio"
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-faint">Mahsulot</p>
              <ul className="space-y-2.5 text-sm">
                <li><a className="text-mute transition-colors hover:text-ink" href="#platforma">{t("nav.platform")}</a></li>
                <li><a className="text-mute transition-colors hover:text-ink" href="#ai-cfo">AI CFO</a></li>
                <li><a className="text-mute transition-colors hover:text-ink" href="#tariflar">{t("nav.pricing")}</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-faint">Kompaniya</p>
              <ul className="space-y-2.5 text-sm">
                <li><a className="text-mute transition-colors hover:text-ink" href="#biz">{t("nav.about")}</a></li>
                <li><a className="text-mute transition-colors hover:text-ink" href="#hero">{t("footer.help")}</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-faint">Huquqiy</p>
              <ul className="space-y-2.5 text-sm">
                <li><a className="text-mute transition-colors hover:text-ink" href="#hero">{t("footer.privacy")}</a></li>
                <li><a className="text-mute transition-colors hover:text-ink" href="#hero">{t("footer.terms")}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-stroke pt-6 text-xs text-faint sm:flex-row">
          <p>© {year} BALANS AI. Barcha huquqlar himoyalangan.</p>
          <p className="ticker">DATA → AI TAHLIL → QAROR → HARAKAT</p>
        </div>
      </div>
    </footer>
  );
}
