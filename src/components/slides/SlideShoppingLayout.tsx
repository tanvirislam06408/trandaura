import SlideContent from "./SlideContent";

// Photo: fruit market (Unsplash – free to use)
const BG = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=80";

export default function SlideShoppingLayout() {
  return (
    <div
      className="relative min-h-[560px] md:min-h-[600px] overflow-hidden bg-center bg-cover"
      style={{ backgroundImage: `url('${BG}')` }}
    >
      {/* Dark gradient overlay – left-heavy so text pops */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0E1F2B]/90 via-[#0E1F2B]/65 to-[#0E1F2B]/20" />

      {/* Subtle green glow bottom-left */}
      <span className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-[#22c55e] opacity-20 blur-3xl" />

      <SlideContent
        badge="Fresh Arrivals 2025"
        headline={"Fresh Fruits,\nDelivered Today."}
        sub="Discover hundreds of organic fruits — farm-fresh, naturally sweet, unbeatable quality."
        cta={{ label: "Shop Now", href: "/explore" }}
        ghost={{ label: "View Categories", href: "/categories" }}
        accent="#22c55e"
        tagClass="bg-green-400/20 text-green-300 border-green-400/30"
      />
    </div>
  );
}
