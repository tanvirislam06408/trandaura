import SlideContent from "./SlideContent";

// Photo: delivery courier handing box of fresh produce (Unsplash – free to use)
const BG = "https://images.unsplash.com/photo-1593344694936-3a789ff94cc7?auto=format&fit=crop&w=1920&q=80";

export default function SlideDeliveryLayout() {
  return (
    <div
      className="relative min-h-[560px] md:min-h-[600px] overflow-hidden bg-center bg-cover"
      style={{ backgroundImage: `url('${BG}')` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f0a]/92 via-[#0d2e1a]/68 to-[#0a1f0a]/25" />

      {/* Green glow */}
      <span className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-[#4ade80] opacity-20 blur-3xl" />

      <SlideContent
        badge="Farm to Table"
        headline={"Fresh Delivery,\nZero Hassle."}
        sub="Free delivery on orders over $20. Picked today, at your door tomorrow."
        cta={{ label: "Start Shopping", href: "/explore" }}
        ghost={{ label: "Track My Order", href: "/orders" }}
        accent="#4ade80"
        tagClass="bg-green-400/20 text-green-300 border-green-400/30"
      />
    </div>
  );
}
