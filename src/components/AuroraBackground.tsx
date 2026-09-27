import { useEffect, useRef } from "react";
import { useTheme } from "../lib/theme";

/**
 * Cinematic animated background — flowing neon light ribbons.
 * Rendered on a low-resolution canvas (GPU-cheap), upscaled with CSS blur,
 * so it looks like soft volumetric light instead of a flat gradient.
 */

interface Ribbon {
  hueA: number;
  hueB: number;
  amp: number;
  yBase: number;
  speed: number;
  phase: number;
  thickness: number;
  drift: number;
  alpha: number;
}

export default function AuroraBackground({ intensity = 1 }: { intensity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const SCALE = isMobile ? 0.14 : 0.2; // low-res render target

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    let t = Math.random() * 1000;

    const light = theme === "light";

    // purple → pink → violet → blue palette (hues)
    const ribbons: Ribbon[] = [
      { hueA: 265, hueB: 300, amp: 0.16, yBase: 0.3, speed: 0.055, phase: 0.0, thickness: 0.16, drift: 0.9, alpha: light ? 0.32 : 0.5 },
      { hueA: 285, hueB: 325, amp: 0.2, yBase: 0.52, speed: 0.042, phase: 2.1, thickness: 0.2, drift: -0.7, alpha: light ? 0.26 : 0.42 },
      { hueA: 225, hueB: 265, amp: 0.14, yBase: 0.72, speed: 0.05, phase: 4.4, thickness: 0.15, drift: 0.55, alpha: light ? 0.22 : 0.38 },
      ...(isMobile
        ? []
        : ([{ hueA: 200, hueB: 250, amp: 0.11, yBase: 0.15, speed: 0.036, phase: 1.2, thickness: 0.1, drift: -0.45, alpha: light ? 0.16 : 0.26 }] as Ribbon[])),
    ];

    const resize = () => {
      w = Math.max(2, Math.floor(window.innerWidth * SCALE));
      h = Math.max(2, Math.floor(window.innerHeight * SCALE));
      canvas.width = w;
      canvas.height = h;
    };
    resize();
    window.addEventListener("resize", resize);

    const drawRibbon = (r: Ribbon, time: number) => {
      const pts: [number, number][] = [];
      const N = 22;
      for (let i = 0; i <= N; i++) {
        const x = (i / N) * w * 1.3 - w * 0.15;
        const k = i / N;
        const y =
          h * r.yBase +
          Math.sin(k * 4.2 + time * r.speed * 10 + r.phase) * h * r.amp * (0.65 + 0.35 * Math.sin(time * 0.11 + r.phase)) +
          Math.sin(k * 9.1 - time * r.speed * 6.5 + r.phase * 2) * h * r.amp * 0.35 +
          Math.sin(time * 0.07 * r.drift + r.phase) * h * 0.06;
        pts.push([x, y]);
      }

      const hue = r.hueA + (Math.sin(time * 0.08 + r.phase) * 0.5 + 0.5) * (r.hueB - r.hueA);
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      const sat = light ? 80 : 90;
      const lum = light ? 62 : 58;
      grad.addColorStop(0, `hsla(${hue - 28}, ${sat}%, ${lum}%, 0)`);
      grad.addColorStop(0.25, `hsla(${hue - 12}, ${sat}%, ${lum}%, ${r.alpha * intensity})`);
      grad.addColorStop(0.55, `hsla(${hue + 14}, ${sat}%, ${lum + 4}%, ${r.alpha * intensity})`);
      grad.addColorStop(0.85, `hsla(${hue + 30}, ${sat}%, ${lum}%, ${r.alpha * 0.7 * intensity})`);
      grad.addColorStop(1, `hsla(${hue + 40}, ${sat}%, ${lum}%, 0)`);

      ctx.strokeStyle = grad;
      ctx.lineWidth = h * r.thickness * (0.85 + 0.15 * Math.sin(time * 0.15 + r.phase * 3));
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length - 1; i++) {
        const xc = (pts[i][0] + pts[i + 1][0]) / 2;
        const yc = (pts[i][1] + pts[i + 1][1]) / 2;
        ctx.quadraticCurveTo(pts[i][0], pts[i][1], xc, yc);
      }
      ctx.stroke();
    };

    const frame = () => {
      if (!running) return;
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = light ? "source-over" : "lighter";
      for (const r of ribbons) drawRibbon(r, t);
      raf = requestAnimationFrame(frame);
    };

    if (reduced) {
      // draw a single static frame
      t = 12;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = light ? "source-over" : "lighter";
      for (const r of ribbons) drawRibbon(r, t);
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onVis = () => {
      running = document.visibilityState === "visible";
      if (running && !reduced) raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [theme, intensity]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--bg)" }} />
      <canvas
        ref={ref}
        className="absolute inset-0 h-full w-full"
        style={{ filter: "blur(38px) saturate(1.15)", transform: "scale(1.12)", opacity: 0.9 }}
      />
      {/* fine grain to avoid banding */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 0%, transparent 40%, var(--bg) 100%)" }}
      />
    </div>
  );
}
