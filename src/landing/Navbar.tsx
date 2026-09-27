import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import Logo from "../components/Logo";
import { useTheme } from "../lib/theme";
import { useLang } from "../lib/i18n";

const links = [
  { k: "nav.features", href: "#modullar" },
  { k: "nav.aicfo", href: "#ai-cfo" },
  { k: "nav.platform", href: "#platforma" },
  { k: "nav.pricing", href: "#tariflar" },
  { k: "nav.about", href: "#biz" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { lang, setLang, t } = useLang();
  const nav = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-6 sm:pt-4"
      >
        <div
          className={`flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled ? "glass-strong shadow-[0_12px_48px_-12px_rgba(0,0,0,0.5)]" : "border border-transparent"
          }`}
        >
          <Link to="/" aria-label="BALANS AI bosh sahifa" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Asosiy navigatsiya">
            {links.map((l) => (
              <a key={l.k} href={l.href} className="nav-link">
                {t(l.k)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center overflow-hidden rounded-full border border-stroke text-xs font-semibold md:flex">
              {(["uz", "ru"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1.5 uppercase transition-colors ${
                    lang === l ? "bg-vio/20 text-ink" : "text-faint hover:text-mute"
                  }`}
                  aria-pressed={lang === l}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              onClick={toggle}
              aria-label={theme === "dark" ? "Yorug' rejim" : "Qorong'i rejim"}
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-stroke text-mute transition-all hover:border-vio/50 hover:text-ink md:flex"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <button onClick={() => nav("/login")} className="hidden text-sm font-medium text-mute transition-colors hover:text-ink sm:block">
              {t("nav.login")}
            </button>

            <button onClick={() => nav("/register")} className="btn btn-primary !px-4 !py-2.5 !text-sm">
              {t("nav.start")}
            </button>

            <button
              className="flex h-9 w-9 items-center justify-center rounded-full border border-stroke text-ink lg:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Menyu"
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-3 top-[70px] z-40 rounded-2xl glass-strong p-5 lg:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobil navigatsiya">
              {links.map((l) => (
                <a
                  key={l.k}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-[15px] font-medium text-mute transition-colors hover:bg-panel hover:text-ink"
                >
                  {t(l.k)}
                </a>
              ))}
            </nav>
            <div className="mt-4 flex items-center justify-between border-t border-stroke pt-4">
              <div className="flex items-center overflow-hidden rounded-full border border-stroke text-xs font-semibold">
                {(["uz", "ru"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-2 uppercase ${lang === l ? "bg-vio/20 text-ink" : "text-faint"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <button
                onClick={toggle}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke text-mute"
                aria-label="Rejimni almashtirish"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button onClick={() => { setOpen(false); nav("/login"); }} className="text-sm font-medium text-mute">
                {t("nav.login")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
