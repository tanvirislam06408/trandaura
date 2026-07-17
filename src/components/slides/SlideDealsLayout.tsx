import SlideContent from "./SlideContent";

// Photo: fruit basket (Unsplash – free to use)
const BG = "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1920&q=80";

export default function SlideDealsLayout() {
  return (
    <div
      className="relative min-h-[560px] md:min-h-[600px] overflow-hidden bg-center bg-cover"
      style={{ backgroundImage: `url('${BG}')` }}
    >
      {/* Dark overlay – stronger in centre so illustration area is visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a0a2e]/92 via-[#2d1060]/70 to-[#1a0a2e]/30" />

      {/* Violet glow */}
      <span className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-[#a78bfa] opacity-20 blur-3xl" />

      <SlideContent
        badge="Seasonal Harvest"
        headline={"Seasonal Picks, Every Single Day."}
        sub="Up to 30% off on seasonal fruits. Don't miss out — fresh arrivals daily just for you."
        cta={{ label: "Grab Deals", href: "/explore?season=Summer" }}
        ghost={{ label: "See All Offers", href: "/explore" }}
        accent="#a78bfa"
        tagClass="bg-violet-400/20 text-violet-300 border-violet-400/30"
      />
    </div>
  );
}
