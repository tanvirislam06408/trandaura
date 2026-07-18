import SlideContent from "./SlideContent";

// Photo: delivery courier handing box of fresh produce (Unsplash – free to use)
const BG = "https://images.unsplash.com/photo-1593344694936-3a789ff94cc7?auto=format&fit=crop&w=1920&q=80";

// Delivery illustration
const DeliveryIllustration = () => (
  <div className="relative w-72 h-72 md:w-96 md:h-96">
    {/* Delivery truck */}
    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 animate-float-1" viewBox="0 0 200 200" fill="none">
      {/* Truck body */}
      <rect x="30" y="80" width="100" height="60" rx="8" fill="#22C55E"/>
      <rect x="30" y="80" width="100" height="60" rx="8" fill="url(#truckGrad)"/>
      {/* Truck cab */}
      <path d="M130 80L160 80L170 110L170 140L130 140V80Z" fill="#166534"/>
      {/* Windows */}
      <rect x="135" y="90" width="25" height="20" rx="3" fill="#86EFAC"/>
      {/* Wheels */}
      <circle cx="60" cy="150" r="15" fill="#0E1F2B"/>
      <circle cx="60" cy="150" r="8" fill="#374151"/>
      <circle cx="150" cy="150" r="15" fill="#0E1F2B"/>
      <circle cx="150" cy="150" r="8" fill="#374151"/>
      {/* Fruits in truck */}
      <circle cx="50" cy="105" r="10" fill="#EF4444"/>
      <circle cx="75" cy="100" r="12" fill="#F97316"/>
      <circle cx="100" cy="105" r="10" fill="#FBBF24"/>
      <defs>
        <linearGradient id="truckGrad" x1="30" y1="80" x2="130" y2="140" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22C55E"/>
          <stop offset="1" stopColor="#16A34A"/>
        </linearGradient>
      </defs>
    </svg>
    
    {/* Speed lines */}
    <svg className="absolute top-1/2 left-8 -translate-y-1/2 w-12 h-24 animate-float-2" viewBox="0 0 50 100" fill="none">
      <line x1="10" y1="20" x2="40" y2="20" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
      <line x1="5" y1="40" x2="45" y2="40" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
      <line x1="10" y1="60" x2="40" y2="60" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
      <line x1="5" y1="80" x2="45" y2="80" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
    </svg>
    
    {/* Clock icon */}
    <svg className="absolute bottom-8 right-8 w-16 h-16 md:w-20 md:h-20 animate-float-3" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="30" fill="#FBBF24"/>
      <circle cx="40" cy="40" r="30" fill="url(#clockGrad)"/>
      <circle cx="40" cy="40" r="24" fill="white"/>
      <line x1="40" y1="40" x2="40" y2="25" stroke="#0E1F2B" strokeWidth="3" strokeLinecap="round"/>
      <line x1="40" y1="40" x2="50" y2="45" stroke="#0E1F2B" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="40" cy="40" r="3" fill="#0E1F2B"/>
      <defs>
        <linearGradient id="clockGrad" x1="10" y1="10" x2="70" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCD34D"/>
          <stop offset="1" stopColor="#F59E0B"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export default function SlideDeliveryLayout() {
  return (
    <div
      className="relative min-h-[560px] md:min-h-[600px] overflow-hidden bg-center bg-cover"
      style={{ backgroundImage: `url('${BG}')` }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f0a]/95 via-[#0d2e1a]/80 to-[#166534]/60" />
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#4ade80] opacity-10 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-[#22C55E] opacity-10 blur-3xl" />

      <SlideContent
        badge="Farm to Table"
        headline={"Fresh Delivery,\nZero Hassle."}
        sub="Free delivery on orders over $20. Picked today, at your door tomorrow."
        cta={{ label: "Start Shopping", href: "/explore" }}
        ghost={{ label: "Track My Order", href: "/orders" }}
        accent="#4ade80"
        tagClass="bg-green-400/20 text-green-300 border-green-400/30"
        illustration={<DeliveryIllustration />}
        floatClass="animate-float-1"
      />
    </div>
  );
}
