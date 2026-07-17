import Link from "next/link";

const BG = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1920&q=80";

export default function CallToAction() {
  return (
    <section className="w-full overflow-hidden bg-[#0E1F2B]">
      <div
        className="relative min-h-[420px] overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url('${BG}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E1F2B]/95 via-[#0E1F2B]/80 to-[#0E1F2B]/40" />
        <span className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-[#22c55e] opacity-20 blur-3xl" />

        <div className="relative z-10 mx-auto flex h-full min-h-[420px] max-w-7xl flex-col items-center justify-center px-6 py-16 text-center md:px-12 lg:px-20">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#22c55e]/30 bg-[#22c55e]/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#22c55e]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
            Seasonal Harvest
          </span>

          <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ready for a<br />
            <span className="text-[#22c55e]">fresh</span> experience?
          </h2>

          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/65">
            Hand-picked fruits, exclusive deals, and farm-to-door delivery you can count on.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/explore"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#22c55e] to-[#22c55e]/80 px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
              style={{ boxShadow: "0 8px 24px rgba(34,197,94,0.27)" }}
            >
              Start Shopping
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5l6 7.5-6 7.5M3 12h16.5" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/15 hover:text-white"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            {[
              { icon: "🚚", text: "Free delivery $20+" },
              { icon: "🌱", text: "100% Organic" },
              { icon: "↩️", text: "Quality Guarantee" },
            ].map((b) => (
              <span key={b.text} className="flex items-center gap-1.5 text-xs text-white/50">
                <span>{b.icon}</span>
                {b.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
