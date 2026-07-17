import ProductCard from "@/components/shared/ProductCard";
import { proudtByCategories } from "@/lib/api/productByCategories";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductByCategory = async ({ params }: PageProps) => {
  const { id } = await params;

  const productData = await proudtByCategories(id);

  return (
    <section className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-black transition">
            Home
          </Link>

          <ChevronRight size={16} />

          <Link href="/explore" className="hover:text-black transition">
            Explore
          </Link>

          <ChevronRight size={16} />

          <span className="font-medium text-black capitalize">
            {decodeURIComponent(id)}
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-bold capitalize">
              {decodeURIComponent(id)}
            </h1>

            <p className="text-gray-500 mt-2">
              Explore our premium {decodeURIComponent(id).toLowerCase()} collection.
            </p>
          </div>

          <div className="rounded-xl bg-white border px-5 py-3 shadow-sm">
            <p className="text-sm text-gray-500">
              Products
            </p>

            <h3 className="text-2xl font-bold">
              {productData.length}
            </h3>
          </div>
        </div>

        {/* Products */}
        {productData.length === 0 ? (
          <div className="rounded-2xl border bg-white py-24 text-center">
            <h2 className="text-2xl font-semibold">
              No Products Found
            </h2>

            <p className="mt-3 text-gray-500">
              There are no products available in this category.
            </p>

            <Link
              href="/explore"
              className="inline-flex mt-6 rounded-xl bg-black text-white px-6 py-3 hover:bg-gray-800 transition"
            >
              Explore All Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productData.map((item) => (
              <ProductCard
                key={item._id}
                item={item}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductByCategory;