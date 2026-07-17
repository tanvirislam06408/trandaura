"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

const brands = [
  {
    name: "Nike",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
  },
  {
    name: "Adidas",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
  },
  {
    name: "Puma",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Puma_logo.svg",
  },
  {
    name: "Zara",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg",
  },
  {
    name: "H&M",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg",
  },
  {
    name: "Levi's",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Levi%27s_logo.svg",
  },
  {
    name: "Gucci",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/79/1960s_Gucci_Logo.svg",
  },
  {
    name: "Louis Vuitton",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/46/Louis_Vuitton_logo_and_wordmark.svg",
  },
];

const Brands = () => {
  return (
    <section className="bg-gray-50 section-padding">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="section-badge">
            Trusted Brands
          </span>

          <h2 className="section-heading mt-3">
            Shop Your Favorite Farms
          </h2>

          <p className="section-desc">
            Discover premium organic fruits from the world's most trusted suppliers.
          </p>
        </div>

        <Marquee
          speed={50}
          pauseOnHover
          gradient={false}
        >
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="card-base card-hover mx-5 flex h-32 w-52 items-center justify-center p-6"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={140}
                height={60}
                className="h-14 w-auto object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Brands;