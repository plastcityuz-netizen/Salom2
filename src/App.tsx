import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "./lib/theme";
import { LangProvider } from "./lib/i18n";
import Landing from "./pages/Landing";
import { Login, Register, Onboarding } from "./pages/Auth";
import AppLayout from "./app/AppLayout";
import DashboardPage from "./app/DashboardPage";
import ModulePage from "./app/ModulePages";
import AiCfoPage from "./app/AiCfoPage";
import { ReportsPage, SettingsPage } from "./app/OtherPages";

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="ai-cfo" element={<AiCfoPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path=":module" element={<ModulePage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </LangProvider>
    </ThemeProvider>
  );
}
