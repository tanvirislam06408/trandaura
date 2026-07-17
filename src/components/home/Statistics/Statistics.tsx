'use client'
import CountUp from "react-countup";
import {
  Users,
  ShoppingBag,
  BadgeCheck,
  Smile,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 20000,
    suffix: "+",
    label: "Happy Customers",
  },
  {
    icon: ShoppingBag,
    value: 5000,
    suffix: "+",
    label: "Products Available",
  },
  {
    icon: BadgeCheck,
    value: 150,
    suffix: "+",
    label: "Trusted Brands",
  },
  {
    icon: Smile,
    value: 99,
    suffix: "%",
    label: "Customer Satisfaction",
  },
];

const Statistics = () => {
  return (
    <section className=" section-padding">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center text-white">
          <span className="section-badge text-white/60">
            Our Impact
          </span>

          <h2 className="section-heading mt-3 text-white">
            Trusted by Thousands of Customers
          </h2>

          <p className="section-desc text-white/60">
            TrandAura is committed to providing premium organic fruits,
            fast farm-to-table delivery, and an exceptional shopping experience.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="card-base card-hover p-8 text-center"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#22c55e]/10 text-[#22c55e]">
                  <Icon size={30} />
                </div>

                <h3 className="text-4xl font-bold text-gray-900">
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    separator=","
                  />
                  {stat.suffix}
                </h3>

                <p className="mt-2 text-gray-600">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Statistics;