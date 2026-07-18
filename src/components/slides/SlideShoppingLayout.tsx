import SlideContent from "./SlideContent";

// Photo: fresh fruits display (Unsplash – free to use)
const BG = "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1920&q=80";

// Fruit SVG illustrations
const FruitIllustration = () => (
  <div className="relative w-72 h-72 md:w-96 md:h-96">
    {/* Main apple */}
    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 animate-float-1" viewBox="0 0 200 200" fill="none">
      <ellipse cx="100" cy="110" rx="70" ry="65" fill="#22C55E"/>
      <ellipse cx="100" cy="110" rx="70" ry="65" fill="url(#appleGrad)"/>
      <path d="M100 45C100 45 95 30 100 20C105 30 100 45 100 45Z" fill="#166534"/>
      <ellipse cx="80" cy="90" rx="15" ry="20" fill="#4ADE80" opacity="0.5"/>
      <defs>
        <linearGradient id="appleGrad" x1="30" y1="45" x2="170" y2="175" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22C55E"/>
          <stop offset="1" stopColor="#16A34A"/>
        </linearGradient>
      </defs>
    </svg>
    
    {/* Orange */}
    <svg className="absolute top-8 right-4 w-20 h-20 md:w-28 md:h-28 animate-float-2" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="55" r="35" fill="#F97316"/>
      <circle cx="50" cy="55" r="35" fill="url(#orangeGrad)"/>
      <circle cx="40" cy="48" r="5" fill="#FDBA74" opacity="0.6"/>
      <path d="M50 20C50 20 48 15 50 10C52 15 50 20 50 20Z" fill="#166534"/>
      <defs>
        <linearGradient id="orangeGrad" x1="15" y1="20" x2="85" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FB923C"/>
          <stop offset="1" stopColor="#EA580C"/>
        </linearGradient>
      </defs>
    </svg>
    
    {/* Strawberry */}
    <svg className="absolute bottom-8 left-4 w-16 h-16 md:w-24 md:h-24 animate-float-3" viewBox="0 0 100 100" fill="none">
      <path d="M50 25L75 50C75 75 50 90 50 90C50 90 25 75 25 50L50 25Z" fill="#EF4444"/>
      <path d="M50 25L75 50C75 75 50 90 50 90C50 90 25 75 25 50L50 25Z" fill="url(#strawGrad)"/>
      <circle cx="40" cy="50" r="2" fill="#FEE2E2"/>
      <circle cx="50" cy="60" r="2" fill="#FEE2E2"/>
      <circle cx="60" cy="50" r="2" fill="#FEE2E2"/>
      <circle cx="45" cy="70" r="2" fill="#FEE2E2"/>
      <circle cx="55" cy="70" r="2" fill="#FEE2E2"/>
      <path d="M50 25L45 15L50 20L55 15L50 25Z" fill="#166534"/>
      <defs>
        <linearGradient id="strawGrad" x1="25" y1="25" x2="75" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F87171"/>
          <stop offset="1" stopColor="#DC2626"/>
        </linearGradient>
      </defs>
    </svg>
    
    {/* Decorative leaves */}
    <svg className="absolute top-4 left-1/4 w-12 h-12 animate-float-2" viewBox="0 0 50 50" fill="none">
      <path d="M25 5C25 5 40 15 40 30C40 45 25 45 25 45C25 45 10 45 10 30C10 15 25 5 25 5Z" fill="#22C55E" opacity="0.7"/>
    </svg>
  </div>
);

export default function SlideShoppingLayout() {
  return (
    <div
      className="relative min-h-[560px] md:min-h-[600px] overflow-hidden bg-center bg-cover"
      style={{ backgroundImage: `url('${BG}')` }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E1F2B]/95 via-[#0E1F2B]/80 to-[#166534]/60" />
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#22c55e] opacity-10 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-[#16A34A] opacity-10 blur-3xl" />

      <SlideContent
        badge="Fresh Arrivals 2025"
        headline={"Fresh Fruits,\nDelivered Today."}
        sub="Discover hundreds of organic fruits — farm-fresh, naturally sweet, unbeatable quality."
        cta={{ label: "Shop Now", href: "/explore" }}
        ghost={{ label: "View Categories", href: "/categories" }}
        accent="#22c55e"
        tagClass="bg-green-400/20 text-green-300 border-green-400/30"
        illustration={<FruitIllustration />}
        floatClass="animate-float-1"
      />
    </div>
  );
}
