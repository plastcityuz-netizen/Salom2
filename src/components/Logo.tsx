export default function Logo({ size = 30 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#a78bfa" />
            <stop offset="0.55" stopColor="#e879f9" />
            <stop offset="1" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="60" height="60" rx="17" fill="none" stroke="url(#lg)" strokeWidth="2.5" opacity="0.9" />
        <path
          d="M22 45V19h11.5a8.2 8.2 0 0 1 4.7 14.9A8.7 8.7 0 0 1 34.4 45H22Zm6.2-15.4h4.8a3.6 3.6 0 0 0 0-7.2h-4.8v7.2Zm0 10.9h5.8a3.85 3.85 0 0 0 0-7.7h-5.8v7.7Z"
          fill="currentColor"
        />
        <circle cx="45.5" cy="20.5" r="3.2" fill="url(#lg)" />
      </svg>
      <span className="font-display text-[1.05rem] font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
        BALANS<span className="text-grad"> AI</span>
      </span>
    </span>
  );
}
