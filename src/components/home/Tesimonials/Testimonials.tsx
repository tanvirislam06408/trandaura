import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Verified Buyer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    review:
      "TrandAura exceeded my expectations. The quality of the fresh fruits is amazing, delivery was incredibly fast, and the customer support was very responsive. I'll definitely shop here again!",
  },
  {
    id: 2,
    name: "Michael Brown",
    role: "Fashion Enthusiast",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    review:
      "I ordered seasonal mangoes and berries, and both arrived fresh and perfectly ripe. The sizing was accurate and the eco-friendly packaging was premium. Highly recommended!",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Regular Customer",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    review:
      "Great shopping experience from start to finish. The website is easy to use, checkout is smooth, and the return process is hassle-free.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white section-padding">
      <div className="container mx-auto px-4">
        <div className="mb-14 text-center">
          <span className="section-badge">
            Testimonials
          </span>

          <h2 className="section-heading mt-3">
            What Our Customers Say
          </h2>

          <p className="section-desc">
            Thousands of happy customers trust TrandAura for quality organic fruits,
            fast delivery, and exceptional service.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="card-base card-hover p-8"
            >
              <div className="mb-5 flex">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="fill-[#22c55e] text-[#22c55e]"
                  />
                ))}
              </div>

              <p className="mb-8 leading-7 text-gray-600">
                &ldquo;{item.review}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded-full object-cover ring-2 ring-gray-100"
                />

                <div>
                  <h4 className="font-semibold text-gray-900">
                    {item.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;