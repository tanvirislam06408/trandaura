import Link from "next/link";
import { ReactNode } from "react";

export interface SlideContentProps {
  badge: string;
  headline: string;
  sub: string;
  cta: { label: string; href: string };
  ghost: { label: string; href: string };
  accent: string;
  tagClass: string;
  illustration?: ReactNode;
  floatClass?: string;
}

const TRUST_BADGES = [
  { icon: "🚚", text: "Free delivery $20+" },
  { icon: "🌱", text: "100% Organic" },
  { icon: "✅", text: "Quality Guarantee" },
];

export default function SlideContent({
  badge,
  headline,
  sub,
  cta,
  ghost,
  accent,
  tagClass,
  illustration,
  floatClass,
}: SlideContentProps) {
  return (
    <div className="relative z-10 mx-auto flex min-h-[560px] md:min-h-[600px] max-w-7xl flex-col items-center justify-center gap-10 px-6 py-16 md:flex-row md:px-12 lg:px-20">

      {/* ── Text column ── */}
      <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left gap-5">

        {/* Badge */}
        <span className={`slide-text-badge inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide uppercase ${tagClass}`}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          {badge}
        </span>

        {/* Headline */}
        <h1
          className="slide-text-title text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          style={{ whiteSpace: "pre-line" }}
        >
          {headline}
        </h1>

        {/* Sub-text */}
        <p className="slide-text-sub max-w-md text-base leading-relaxed text-white/65">
          {sub}
        </p>

        {/* CTA buttons */}
        <div className="slide-text-cta flex flex-wrap items-center gap-3 pt-1">
          <Link
            href={cta.href}
            className="group inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
              boxShadow: `0 8px 24px ${accent}44`,
            }}
          >
            {cta.label}
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5l6 7.5-6 7.5M3 12h16.5" />
            </svg>
          </Link>

          <Link
            href={ghost.href}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/15 hover:text-white"
          >
            {ghost.label}
          </Link>
        </div>

        {/* Trust badges */}
        <div className="slide-text-cta flex flex-wrap items-center gap-4 pt-2">
          {TRUST_BADGES.map((b) => (
            <span key={b.text} className="flex items-center gap-1.5 text-xs text-white/50">
              <span>{b.icon}</span>
              {b.text}
            </span>
          ))}
        </div>
      </div>

      {/* ── Illustration column (optional) ── */}
      {illustration && (
        <div className={`slide-illustration flex flex-1 items-center justify-center ${floatClass ?? ""}`}>
          {illustration}
        </div>
      )}
    </div>
  );
}
