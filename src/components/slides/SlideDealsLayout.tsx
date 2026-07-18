import SlideContent from "./SlideContent";

// Photo: colorful fruit assortment (Unsplash – free to use)
const BG = "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1920&q=80";

// Fruit SVG illustrations for deals slide
const DealsIllustration = () => (
  <div className="relative w-72 h-72 md:w-96 md:h-96">
    {/* Mango */}
    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 animate-float-1" viewBox="0 0 200 200" fill="none">
      <ellipse cx="100" cy="110" rx="65" ry="55" fill="#FBBF24" transform="rotate(-15 100 110)"/>
      <ellipse cx="100" cy="110" rx="65" ry="55" fill="url(#mangoGrad)" transform="rotate(-15 100 110)"/>
      <path d="M100 55C100 55 95 40 100 30C105 40 100 55 100 55Z" fill="#166534"/>
      <ellipse cx="85" cy="95" rx="12" ry="18" fill="#FDE68A" opacity="0.5"/>
      <defs>
        <linearGradient id="mangoGrad" x1="35" y1="55" x2="165" y2="165" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCD34D"/>
          <stop offset="1" stopColor="#F59E0B"/>
        </linearGradient>
      </defs>
    </svg>
    
    {/* Grapes cluster */}
    <svg className="absolute top-8 right-4 w-24 h-24 md:w-32 md:h-32 animate-float-2" viewBox="0 0 120 120" fill="none">
      <circle cx="40" cy="50" r="18" fill="#8B5CF6"/>
      <circle cx="70" cy="50" r="18" fill="#7C3AED"/>
      <circle cx="55" cy="75" r="18" fill="#A78BFA"/>
      <circle cx="40" cy="50" r="18" fill="url(#grapeGrad)"/>
      <path d="M55 32C55 32 53 25 55 18C57 25 55 32 55 32Z" fill="#166534"/>
      <defs>
        <linearGradient id="grapeGrad" x1="22" y1="32" x2="88" y2="93" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A78BFA"/>
          <stop offset="1" stopColor="#7C3AED"/>
        </linearGradient>
      </defs>
    </svg>
    
    {/* Blueberries */}
    <svg className="absolute bottom-8 left-4 w-16 h-16 md:w-20 md:h-20 animate-float-3" viewBox="0 0 80 80" fill="none">
      <circle cx="25" cy="35" r="14" fill="#3B82F6"/>
      <circle cx="50" cy="30" r="14" fill="#2563EB"/>
      <circle cx="40" cy="55" r="14" fill="#60A5FA"/>
      <circle cx="25" cy="35" r="14" fill="url(#berryGrad)"/>
      <defs>
        <linearGradient id="berryGrad" x1="11" y1="21" x2="64" y2="69" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA"/>
          <stop offset="1" stopColor="#2563EB"/>
        </linearGradient>
      </defs>
    </svg>
    
    {/* Price tag */}
    <svg className="absolute bottom-12 right-8 w-16 h-16 md:w-20 md:h-20 animate-float-1" viewBox="0 0 80 80" fill="none">
      <rect x="10" y="15" width="55" height="35" rx="4" fill="#22C55E"/>
      <circle cx="20" cy="25" r="4" fill="#166534"/>
      <text x="37" y="38" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">30%</text>
      <text x="37" y="55" textAnchor="middle" fill="white" fontSize="8">OFF</text>
    </svg>
  </div>
);

export default function SlideDealsLayout() {
  return (
    <div
      className="relative min-h-[560px] md:min-h-[600px] overflow-hidden bg-center bg-cover"
      style={{ backgroundImage: `url('${BG}')` }}
    >
      {/* Gradient overlay - purple tint for deals */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e]/95 via-[#2d1060]/80 to-[#4c1d95]/60" />
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#a78bfa] opacity-10 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-[#8B5CF6] opacity-10 blur-3xl" />

      <SlideContent
        badge="Seasonal Harvest"
        headline={"Seasonal Picks, Every Single Day."}
        sub="Up to 30% off on seasonal fruits. Don't miss out — fresh arrivals daily just for you."
        cta={{ label: "Grab Deals", href: "/explore?season=Summer" }}
        ghost={{ label: "See All Offers", href: "/explore" }}
        accent="#a78bfa"
        tagClass="bg-violet-400/20 text-violet-300 border-violet-400/30"
        illustration={<DealsIllustration />}
        floatClass="animate-float-2"
      />
    </div>
  );
}
