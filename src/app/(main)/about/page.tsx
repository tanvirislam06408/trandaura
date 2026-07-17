import type { Metadata } from "next";
import {
  Truck,
  ShieldCheck,
  BadgeDollarSign,
  Users,
  ShoppingBag,
  Clock,
  Star,
} from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import CallToAction from "@/components/shared/CallToAction";

export const metadata: Metadata = {
  title: "About — TrandAura",
  description:
    "TrandAura is a marketplace built around one promise: the freshest organic fruits delivered fast.",
};

const principles = [
  {
    icon: Truck,
    title: "Speed is a feature",
    body: "Every listing carries a real delivery window, calculated from actual carrier data — not a hopeful estimate.",
  },
  {
    icon: ShieldCheck,
    title: "Sellers earn their shelf space",
    body: "We audit fulfilment times and return rates continuously. Sellers who can't keep pace lose visibility, automatically.",
  },
  {
    icon: BadgeDollarSign,
    title: "Prices stay honest",
    body: "No inflate-then-discount pricing. The number you see a week before a sale is the number you see during it.",
  },
];

const timeline = [
  { time: "T+0m", step: "Order placed", detail: "Payment confirmed, seller notified instantly." },
  { time: "T+45m", step: "Packed", detail: "Warehouse or seller prepares the shipment." },
  { time: "T+3h", step: "Dispatched", detail: "Handed to the fastest available carrier." },
  { time: "T+1–2d", step: "Delivered", detail: "Tracked door to door, no silent gaps." },
];

const stats = [
  { icon: ShoppingBag, value: "20,000+", label: "Happy Customers" },
  { icon: Users, value: "5,000+", label: "Products Available" },
  { icon: Star, value: "150+", label: "Trusted Brands" },
  { icon: Clock, value: "99%", label: "Customer Satisfaction" },
];

const AboutPage = () => {
  return (
    <div>
      {/* Hero */}
      <AnimatedSection>
        <section className="section-padding">
          <div className="container mx-auto px-4 text-center">
            <span className="section-badge">About TrandAura</span>

            <h1 className="section-heading mt-4 text-5xl lg:text-6xl">
              We built a marketplace around the one thing shoppers actually
              wait for.
            </h1>

            <p className="section-desc text-lg">
              TrandAura started from a simple complaint: getting fresh, quality fruits delivered was too hard.
              So we built a direct farm-to-door network — every seller, every listing, every delivery window, held to
              the highest standards of freshness.
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* Stats */}
      <AnimatedSection>
        <section className="bg-gray-50 section-padding">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="card-base card-hover p-8 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#22c55e]/10 text-[#22c55e]">
                      <Icon size={30} />
                    </div>
                    <h3 className="text-4xl font-bold text-gray-900">{stat.value}</h3>
                    <p className="mt-2 text-gray-600">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Principles */}
      <AnimatedSection>
        <section className="section-padding">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <span className="section-badge">Our Principles</span>
              <h2 className="section-heading mt-3">
                What we hold sellers to
              </h2>
              <p className="section-desc">
                Every seller on TrandAura is measured against these standards — no exceptions.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {principles.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="card-base card-hover p-8">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#22c55e]/10 text-[#22c55e]">
                      <Icon size={26} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{p.title}</h3>
                    <p className="mt-3 text-gray-600 leading-relaxed">{p.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Order timeline */}
      <AnimatedSection>
        <section className="bg-gray-50 section-padding">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <span className="section-badge">How It Works</span>
              <h2 className="section-heading mt-3">
                From order to doorstep
              </h2>
              <p className="section-desc">
                A typical TrandAura order, timestamped the way our tracking
                actually shows it to you.
              </p>
            </div>

            <div className="relative mx-auto max-w-4xl">
              <div className="absolute left-[19px] top-0 bottom-0 hidden w-0.5 bg-[#22c55e]/20 sm:block" />
              <div className="grid gap-10 sm:gap-8">
                {timeline.map((stop) => (
                  <div key={stop.step} className="flex items-start gap-6 sm:gap-8">
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#22c55e] text-sm font-bold text-white shadow-lg shadow-[#22c55e]/25">
                      {stop.time.replace("T+", "")}
                    </div>
                    <div className="card-base card-hover flex-1 p-6">
                      <div className="text-xs font-semibold uppercase tracking-widest text-[#22c55e]">
                        {stop.time}
                      </div>
                      <h3 className="mt-1 text-lg font-bold text-gray-900">
                        {stop.step}
                      </h3>
                      <p className="mt-1 text-gray-600">
                        {stop.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA */}
      <CallToAction />
    </div>
  );
};

export default AboutPage;
