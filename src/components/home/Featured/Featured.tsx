import ProductCard from "@/components/shared/ProductCard";
import { serverFetch } from "@/lib/core/server";
import { Product } from "@/types/product";


const Featured = async () => {
  const productData = await serverFetch<Product[]>("/products-featured");

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <span className="section-badge">
            Featured Products
          </span>

          <h2 className="section-heading mt-3">
            Explore Our Featured Products
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {productData.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;