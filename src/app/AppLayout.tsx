import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeDollarSign, BarChart3, Bell, Boxes, BrainCircuit, Calculator, Factory,
  Landmark, LayoutDashboard, LogOut, Menu, Moon, Settings, ShoppingCart, Sun, Users, X,
} from "lucide-react";
import Logo from "../components/Logo";
import AuroraBackground from "../components/AuroraBackground";
import { getUser, isAuthed, logout } from "../lib/auth";
import { useTheme } from "../lib/theme";

export const appNav = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/app/accounting", label: "Buxgalteriya", icon: Calculator },
  { to: "/app/sales", label: "Savdo", icon: ShoppingCart },
  { to: "/app/purchases", label: "Xarid", icon: BadgeDollarSign },
  { to: "/app/inventory", label: "Ombor", icon: Boxes },
  { to: "/app/production", label: "Ishlab chiqarish", icon: Factory },
  { to: "/app/finance", label: "Moliya", icon: Landmark },
  { to: "/app/hr", label: "HR", icon: Users },
  { to: "/app/reports", label: "Hisobotlar", icon: BarChart3 },
  { to: "/app/ai-cfo", label: "AI CFO", icon: BrainCircuit, ai: true },
  { to: "/app/settings", label: "Sozlamalar", icon: Settings },
];

export default function AppLayout() {
  const nav = useNavigate();
  const loc = useLocation();
  const { theme, toggle } = useTheme();
  const [drawer, setDrawer] = useState(false);
  const user = getUser();

  useEffect(() => {
    if (!isAuthed()) nav("/login", { replace: true });
  }, [nav]);

  useEffect(() => {
    setDrawer(false);
    window.scrollTo(0, 0);
  }, [loc.pathname]);

  const doLogout = () => {
    logout();
    nav("/");
  };

  const current = appNav.find((n) => (n.end ? loc.pathname === n.to : loc.pathname.startsWith(n.to)));

  return (
    <div className="relative min-h-screen">
      <AuroraBackground intensity={0.55} />

      {/* -------- desktop sidebar -------- */}
      <aside className="glass-strong fixed inset-y-3 left-3 z-40 hidden w-60 flex-col rounded-3xl p-4 lg:flex">
        <div className="px-2 pb-5 pt-1">
          <Logo size={26} />
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto" aria-label="Ilova navigatsiyasi">
          {appNav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-vio/15 text-ink shadow-[inset_0_0_0_1px_rgba(167,139,250,0.3)]"
                    : "text-mute hover:bg-panel hover:text-ink"
                }`
              }
            >
              <n.icon size={16} className={n.ai ? "text-mag" : "text-vio"} />
              {n.label}
              {n.ai && <span className="dot-pulse ml-auto h-1.5 w-1.5 rounded-full bg-mag" />}
            </NavLink>
          ))}
        </nav>
        <div className="mt-3 border-t border-stroke pt-3">
          <div className="flex items-center gap-3 rounded-xl px-2 py-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#7c3aed] to-[#d946ef] text-sm font-bold text-white">
              {(user?.name?.[0] ?? "B").toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{user?.name ?? "Foydalanuvchi"}</p>
              <p className="truncate text-[11px] text-faint">{user?.company ?? ""}</p>
            </div>
            <button onClick={doLogout} aria-label="Chiqish" className="text-faint transition-colors hover:text-bad">
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* -------- topbar -------- */}
      <header className="glass-strong fixed inset-x-3 top-3 z-30 flex items-center justify-between rounded-2xl px-4 py-2.5 lg:left-[264px]">
        <div className="flex items-center gap-3">
          <button className="text-ink lg:hidden" onClick={() => setDrawer(true)} aria-label="Menyu">
            <Menu size={19} />
          </button>
          <div>
            <p className="text-sm font-bold">{current?.label ?? "Dashboard"}</p>
            <p className="hidden text-[11px] text-faint sm:block">{user?.company} · 27-sentyabr, 2026</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="mr-1 hidden items-center gap-1.5 rounded-full border border-good/30 bg-good/10 px-3 py-1.5 text-[11px] font-semibold text-good sm:flex">
            <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-good" /> Trial: 27 kun qoldi
          </span>
          <button
            onClick={toggle}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stroke text-mute transition-colors hover:text-ink"
            aria-label="Rejimni almashtirish"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-stroke text-mute transition-colors hover:text-ink" aria-label="Bildirishnomalar">
            <Bell size={15} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-bad" />
          </button>
        </div>
      </header>

      {/* -------- mobile drawer -------- */}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="glass-strong fixed inset-y-3 left-3 z-50 flex w-64 flex-col rounded-3xl p-4 lg:hidden"
            >
              <div className="flex items-center justify-between px-2 pb-4">
                <Logo size={24} />
                <button onClick={() => setDrawer(false)} aria-label="Yopish" className="text-mute">
                  <X size={18} />
                </button>
              </div>
              <nav className="flex-1 space-y-1 overflow-y-auto">
                {appNav.map((n) => (
                  <NavLink
                    key={n.to}
                    to={n.to}
                    end={n.end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium transition-colors ${
                        isActive ? "bg-vio/15 text-ink" : "text-mute"
                      }`
                    }
                  >
                    <n.icon size={17} className={n.ai ? "text-mag" : "text-vio"} />
                    {n.label}
                  </NavLink>
                ))}
              </nav>
              <button onClick={doLogout} className="mt-3 flex items-center gap-3 border-t border-stroke px-3 pb-1 pt-4 text-sm text-mute">
                <LogOut size={16} /> Chiqish
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* -------- content -------- */}
      <main className="px-3 pb-28 pt-20 lg:pb-10 lg:pl-[264px] lg:pr-4">
        <Outlet />
      </main>

      {/* -------- mobile bottom nav -------- */}
      <nav
        className="glass-strong fixed inset-x-3 bottom-3 z-30 grid grid-cols-5 items-end rounded-3xl px-2 pb-2 pt-2 lg:hidden"
        aria-label="Mobil ilova navigatsiyasi"
      >
        {[appNav[0], appNav[2], appNav[9], appNav[8], appNav[10]].map((n) =>
          n.ai ? (
            <NavLink key={n.to} to={n.to} className="relative -mt-7 flex flex-col items-center" aria-label="AI CFO">
              <span className="ai-breathe flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#7c3aed] to-[#d946ef] text-white shadow-lg">
                <BrainCircuit size={22} />
              </span>
              <span className="mt-1 text-[10px] font-semibold text-mag">AI CFO</span>
            </NavLink>
          ) : (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-2xl py-2 text-[10px] font-medium transition-colors ${
                  isActive ? "text-vio" : "text-faint"
                }`
              }
            >
              <n.icon size={19} />
              {n.label.split(" ")[0]}
            </NavLink>
          )
        )}
      </nav>
    </div>
  );
}
