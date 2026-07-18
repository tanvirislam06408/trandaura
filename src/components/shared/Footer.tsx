import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#0E1F2B] to-[#0a1520] text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-[#22c55e] opacity-5 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-[#16A34A] opacity-5 blur-3xl" />
      
      {/* Floating fruit decorations */}
      <svg className="absolute top-10 right-10 w-16 h-16 opacity-10 animate-float-1" viewBox="0 0 100 100" fill="none">
        <ellipse cx="50" cy="55" rx="30" ry="28" fill="#22C55E"/>
        <path d="M50 27V15" stroke="#166534" strokeWidth="3" strokeLinecap="round"/>
        <path d="M52 18C58 12 65 15 62 22C59 18 54 17 52 18Z" fill="#16A34A"/>
      </svg>
      <svg className="absolute bottom-20 left-8 w-12 h-12 opacity-10 animate-float-2" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="55" r="28" fill="#F97316"/>
        <path d="M50 27V18" stroke="#166534" strokeWidth="2" strokeLinecap="round"/>
      </svg>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#22c55e] to-[#16A34A] text-white shadow-lg shadow-[#22c55e]/20">
                <FiShoppingBag size={22} />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Trand<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] to-[#4ade80]">Aura</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
              Your one-stop destination for fresh, organic fruits. Shop the latest seasonal picks with fast delivery.
            </p>
            
            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#22c55e] mb-3">Stay Fresh</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#22c55e]/50 focus:bg-white/10 transition-all"
                />
                <button className="rounded-full bg-gradient-to-r from-[#22c55e] to-[#16A34A] px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#22c55e]/25">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-[#22c55e]">Shop</h3>
            <ul className="space-y-3">
              {[
                { label: "All Fruits", href: "/explore" },
                { label: "Citrus", href: "/explore?category=Citrus" },
                { label: "Tropical", href: "/explore?category=Tropical" },
                { label: "Berries", href: "/explore?category=Berries" },
                { label: "Seasonal", href: "/explore?category=Seasonal" },
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-white/40 transition-all duration-200 hover:text-[#22c55e] hover:translate-x-1 inline-flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#22c55e] opacity-0 transition-opacity hover:opacity-100" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-[#22c55e]">Company</h3>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Categories", href: "/categories" },
                { label: "Dashboard", href: "/dashboard/user" },
                { label: "Contact", href: "/about#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/40 transition-all duration-200 hover:text-[#22c55e] hover:translate-x-1 inline-flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#22c55e] opacity-0 transition-opacity hover:opacity-100" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-[#22c55e]">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#22c55e]/10 text-[#22c55e]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/30 mb-0.5">Email</p>
                  <p className="text-sm text-white/60 hover:text-[#22c55e] transition-colors">support@trandaura.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#22c55e]/10 text-[#22c55e]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/30 mb-0.5">Phone</p>
                  <p className="text-sm text-white/60 hover:text-[#22c55e] transition-colors">+880 1XXXXXXXXX</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#22c55e]/10 text-[#22c55e]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/30 mb-0.5">Location</p>
                  <p className="text-sm text-white/60">Dhaka, Bangladesh</p>
                </div>
              </li>
            </ul>
            
            {/* Social */}
            <div className="mt-6 flex gap-3">
              {[
                { icon: FaFacebookF, href: "#", label: "Facebook" },
                { icon: FaInstagram, href: "#", label: "Instagram" },
                { icon: FaTwitter, href: "#", label: "Twitter" },
                { icon: FaYoutube, href: "#", label: "Youtube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/40 transition-all duration-300 hover:border-[#22c55e]/40 hover:bg-[#22c55e]/10 hover:text-[#22c55e] hover:scale-110 hover:-translate-y-1"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-white/30">
              &copy; {new Date().getFullYear()} TrandAura. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-xs text-white/30 hover:text-[#22c55e] transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-xs text-white/30 hover:text-[#22c55e] transition-colors">Terms of Service</Link>
              <Link href="#" className="text-xs text-white/30 hover:text-[#22c55e] transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
