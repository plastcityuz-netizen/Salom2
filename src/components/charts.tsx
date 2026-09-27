import { motion } from "framer-motion";
import { useId } from "react";

/* ---------- helpers ---------- */
function smoothPath(points: [number, number][]) {
  if (points.length < 2) return "";
  let d = `M ${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return d;
}

function scale(data: number[], w: number, h: number, pad = 6): [number, number][] {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  return data.map((v, i) => [
    (i / (data.length - 1)) * (w - pad * 2) + pad,
    h - pad - ((v - min) / span) * (h - pad * 2),
  ]);
}

/* ---------- Line / Area chart ---------- */
export function LineChart({
  data,
  data2,
  w = 420,
  h = 140,
  color = "var(--vio)",
  color2 = "var(--cyan)",
  fill = true,
  strokeWidth = 2.25,
  className,
}: {
  data: number[];
  data2?: number[];
  w?: number;
  h?: number;
  color?: string;
  color2?: string;
  fill?: boolean;
  strokeWidth?: number;
  className?: string;
}) {
  const id = useId();
  const pts = scale(data, w, h);
  const d = smoothPath(pts);
  const area = `${d} L ${pts[pts.length - 1][0]},${h} L ${pts[0][0]},${h} Z`;
  const pts2 = data2 ? scale(data2, w, h) : null;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.28" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="var(--stroke)" strokeWidth="0.6" strokeDasharray="3 5" />
      ))}
      {fill && (
        <motion.path
          d={area}
          fill={`url(#${id}-a)`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.4 }}
        />
      )}
      {pts2 && (
        <motion.path
          d={smoothPath(pts2)}
          fill="none"
          stroke={color2}
          strokeWidth={strokeWidth * 0.8}
          strokeLinecap="round"
          strokeDasharray="5 6"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.15 }}
        />
      )}
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
      <motion.circle
        cx={pts[pts.length - 1][0]}
        cy={pts[pts.length - 1][1]}
        r="3.4"
        fill={color}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, type: "spring", stiffness: 300 }}
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      />
    </svg>
  );
}

/* ---------- Bar chart ---------- */
export function BarChart({
  data,
  w = 420,
  h = 140,
  color = "var(--vio)",
  negColor = "var(--bad)",
  radius = 3,
  className,
}: {
  data: number[];
  w?: number;
  h?: number;
  color?: string;
  negColor?: string;
  radius?: number;
  className?: string;
}) {
  const max = Math.max(...data.map(Math.abs)) || 1;
  const hasNeg = data.some((v) => v < 0);
  const zero = hasNeg ? h / 2 : h;
  const bw = (w / data.length) * 0.52;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
      {hasNeg && <line x1="0" x2={w} y1={zero} y2={zero} stroke="var(--stroke)" strokeWidth="0.8" />}
      {data.map((v, i) => {
        const bh = (Math.abs(v) / max) * (hasNeg ? h / 2 - 6 : h - 10);
        const x = (i / data.length) * w + ((w / data.length) - bw) / 2;
        const y = v >= 0 ? zero - bh : zero;
        return (
          <motion.rect
            key={i}
            x={x}
            width={bw}
            rx={radius}
            fill={v >= 0 ? color : negColor}
            opacity={0.85}
            initial={{ y: zero, height: 0 }}
            whileInView={{ y, height: bh }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.045, ease: [0.22, 1, 0.36, 1] }}
          />
        );
      })}
    </svg>
  );
}

/* ---------- Donut chart ---------- */
export function Donut({
  segments,
  size = 150,
  thickness = 14,
  className,
  center,
  centerSub,
}: {
  segments: { value: number; color: string }[];
  size?: number;
  thickness?: number;
  className?: string;
  center?: string;
  centerSub?: string;
}) {
  const r = (size - thickness) / 2;
  const C = 2 * Math.PI * r;
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  let acc = 0;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={className} style={{ width: size, height: size }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--stroke)" strokeWidth={thickness * 0.55} />
      {segments.map((s, i) => {
        const frac = s.value / total;
        const dash = frac * C - 4;
        const offset = -acc * C;
        acc += frac;
        return (
          <motion.circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={`${Math.max(dash, 1)} ${C}`}
            initial={{ strokeDashoffset: offset + C * 0.25 + 40, opacity: 0 }}
            whileInView={{ strokeDashoffset: offset + C * 0.25, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        );
      })}
      {center && (
        <text x="50%" y="48%" textAnchor="middle" fill="var(--ink)" fontSize={size * 0.14} fontWeight={700} fontFamily="var(--font-display)">
          {center}
        </text>
      )}
      {centerSub && (
        <text x="50%" y="62%" textAnchor="middle" fill="var(--mute)" fontSize={size * 0.075}>
          {centerSub}
        </text>
      )}
    </svg>
  );
}

/* ---------- Sparkline ---------- */
export function Spark({ data, color = "var(--vio)", w = 90, h = 30 }: { data: number[]; color?: string; w?: number; h?: number }) {
  const pts = scale(data, w, h, 2);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: w, height: h }}>
      <motion.path
        d={smoothPath(pts)}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </svg>
  );
}
