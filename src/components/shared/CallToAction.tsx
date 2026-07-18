import Link from "next/link";

// Fruit-themed decorative SVGs
const FloatingFruits = () => (
  <>
    {/* Apple */}
    <svg className="absolute top-8 left-8 w-16 h-16 md:w-24 md:h-24 animate-float-1 opacity-60" viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="55" rx="30" ry="28" fill="#22C55E"/>
      <path d="M50 27V15" stroke="#166534" strokeWidth="3" strokeLinecap="round"/>
      <path d="M52 18C58 12 65 15 62 22C59 18 54 17 52 18Z" fill="#16A34A"/>
    </svg>
    
    {/* Orange */}
    <svg className="absolute top-12 right-12 w-12 h-12 md:w-20 md:h-20 animate-float-2 opacity-60" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="55" r="28" fill="#F97316"/>
      <circle cx="42" cy="48" r="4" fill="#FDBA74" opacity="0.6"/>
      <path d="M50 27V18" stroke="#166534" strokeWidth="2" strokeLinecap="round"/>
    </svg>
    
    {/* Strawberry */}
    <svg className="absolute bottom-8 left-16 w-10 h-10 md:w-16 md:h-16 animate-float-3 opacity-60" viewBox="0 0 100 100" fill="none">
      <path d="M50 30L70 50C70 70 50 85 50 85C50 85 30 70 30 50L50 30Z" fill="#EF4444"/>
      <circle cx="45" cy="55" r="2" fill="#FEE2E2"/>
      <circle cx="55" cy="60" r="2" fill="#FEE2E2"/>
      <path d="M50 30L46 22L50 26L54 22L50 30Z" fill="#166534"/>
    </svg>
    
    {/* Grapes */}
    <svg className="absolute bottom-12 right-20 w-14 h-14 md:w-20 md:h-20 animate-float-4 opacity-60" viewBox="0 0 100 100" fill="none">
      <circle cx="40" cy="45" r="12" fill="#8B5CF6"/>
      <circle cx="60" cy="45" r="12" fill="#7C3AED"/>
      <circle cx="50" cy="65" r="12" fill="#A78BFA"/>
      <path d="M50 33V22" stroke="#166534" strokeWidth="2" strokeLinecap="round"/>
    </svg>
    
    {/* Leaf decorations */}
    <svg className="absolute top-1/2 left-4 w-8 h-8 md:w-12 md:h-12 animate-float-2 opacity-40" viewBox="0 0 50 50" fill="none">
      <path d="M25 5C25 5 40 15 40 30C40 45 25 45 25 45C25 45 10 45 10 30C10 15 25 5 25 5Z" fill="#22C55E"/>
    </svg>
    <svg className="absolute top-1/3 right-4 w-6 h-6 md:w-10 md:h-10 animate-float-3 opacity-40" viewBox="0 0 50 50" fill="none">
      <path d="M25 5C25 5 40 15 40 30C40 45 25 45 25 45C25 45 10 45 10 30C10 15 25 5 25 5Z" fill="#16A34A"/>
    </svg>
  </>
);

export default function CallToAction() {
  return (
    <section className="w-full overflow-hidden bg-[#0E1F2B]">
      <div className="relative min-h-[420px] overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0E1F2B] via-[#166534]/20 to-[#0E1F2B]" />
        
        {/* Decorative circles */}
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-[#22c55e] opacity-5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-56 h-56 rounded-full bg-[#16A34A] opacity-5 blur-3xl" />
        
        {/* Floating fruits */}
        <FloatingFruits />

        <div className="relative z-10 mx-auto flex h-full min-h-[420px] max-w-7xl flex-col items-center justify-center px-6 py-16 text-center md:px-12 lg:px-20">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#22c55e]/30 bg-[#22c55e]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#22c55e]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            Fresh from Farm
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Taste the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] to-[#4ade80]">
              Natural
            </span>
            <br />
            Goodness
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/60">
            Hand-picked organic fruits delivered fresh to your doorstep. 
            Experience the difference of farm-to-table quality.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/explore"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#22c55e] to-[#16A34A] px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#22c55e]/25 active:scale-95"
            >
              <span className="relative z-10">Shop Fresh Fruits</span>
              <svg
                className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5l6 7.5-6 7.5M3 12h16.5" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-[#16A34A] to-[#22c55e] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
            
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-[#22c55e]/50 hover:bg-[#22c55e]/10 hover:text-white"
            >
              Browse Categories
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: "🚚", text: "Free Delivery", subtext: "Orders $20+" },
              { icon: "🌱", text: "100% Organic", subtext: "Certified Fresh" },
              { icon: "⚡", text: "Same Day", subtext: "Fast Delivery" },
              { icon: "💯", text: "Quality", subtext: "Guaranteed" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-2 backdrop-blur-sm">
                <span className="text-xl">{b.icon}</span>
                <div className="text-left">
                  <span className="block text-xs font-semibold text-white/90">{b.text}</span>
                  <span className="block text-[10px] text-white/40">{b.subtext}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
