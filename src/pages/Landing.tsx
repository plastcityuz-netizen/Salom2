import AuroraBackground from "../components/AuroraBackground";
import Navbar from "../landing/Navbar";
import Hero from "../landing/Hero";
import { Stats, Modules, AiCfoSection, Flow } from "../landing/Sections";
import { DashboardShowcase, Manufacturing, Roles, ReportsSection, Alerts } from "../landing/Sections2";
import { Pricing, TrialCta, Footer } from "../landing/Pricing";

export default function Landing() {
  return (
    <div className="relative">
      <AuroraBackground />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Modules />
        <AiCfoSection />
        <Flow />
        <DashboardShowcase />
        <Manufacturing />
        <Roles />
        <ReportsSection />
        <Alerts />
        <Pricing />
        <TrialCta />
      </main>
      <Footer />
    </div>
  );
}
