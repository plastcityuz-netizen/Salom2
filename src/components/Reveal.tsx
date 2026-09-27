import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Counter({
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1.6, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, to, mv]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${v.toLocaleString("uz-UZ", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}${suffix}`;
      }
    });
    return unsub;
  }, [spring, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={`ticker ${className ?? ""}`}>
      {prefix}0{suffix}
    </span>
  );
}
