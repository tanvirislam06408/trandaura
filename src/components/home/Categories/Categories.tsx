import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Citrus",
    description: "Oranges, lemons, limes, and grapefruits.",
    href: "/categories/Citrus",
    image:
      "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?w=600&q=80",
  },
  {
    title: "Tropical",
    description: "Mangoes, pineapples, bananas, and more.",
    href: "/categories/Tropical",
    image:
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&q=80",
  },
  {
    title: "Berries",
    description: "Strawberries, blueberries, raspberries.",
    href: "/categories/Berries",
    image:
      "https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?w=800",
  },
  {
    title: "Seasonal",
    description: "Freshly picked fruits of the season.",
    href: "/categories/Seasonal",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
  }
];

const Categories = () => {
  return (
    <section className="bg-gray-50 section-padding">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <span className="section-badge">
            Categories
          </span>

          <h2 className="section-heading mt-3">
            Shop by Category
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group card-base card-hover overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {category.title}
                </h3>

                <p className="mt-2 text-gray-600">
                  {category.description}
                </p>

                <span className="mt-5 inline-flex items-center font-semibold text-[#22c55e] transition-all duration-300 group-hover:translate-x-1">
                  Explore Collection &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;