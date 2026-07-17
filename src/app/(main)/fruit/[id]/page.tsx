'use server'
import Image from "next/image";
import { Star, MapPin, Clock3, ChevronRight } from "lucide-react";
import { serverFetch } from "@/lib/core/server";
import { Product } from "@/types/product";
import { addToCart } from "@/lib/actions/addProdutctToCart";
import CartBtn from "@/components/shared/CartBtn";
import { getSession } from "@/lib/core/session";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductDetails = async ({ params }: PageProps) => {
  const { id } = await params;
  const product = await serverFetch<Product>(`/products/${id}`);
  if (!product) return null;

  const user = await getSession();

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto flex items-center gap-1.5 px-4 py-4 text-xs text-gray-500 sm:px-6">
          <span className="hover:text-[#14B8A6] cursor-pointer transition-colors">Catalogue</span>
          <ChevronRight size={12} className="text-gray-300" />
          <span className="hover:text-[#14B8A6] cursor-pointer transition-colors">{product.category}</span>
          <ChevronRight size={12} className="text-gray-300" />
          <span className="text-gray-900 font-medium">{product.fruitName}</span>
        </div>
      </div>

      {/* Main Product */}
      <AnimatedSection>
        <section className="section-padding">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Image */}
              <div>
                <div className="card-base overflow-hidden">
                  <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                    <Image
                      src={product.imageUrl}
                      alt={product.fruitName}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {product.featured && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#22c55e]/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#22c55e]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
                    Featured selection
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col">
                <span className="section-badge">{product.category}</span>

                <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
                  {product.fruitName}
                </h1>

                <p className="mt-5 max-w-md text-gray-600 leading-relaxed">
                  {product.shortDescription}
                </p>

                {/* Meta row */}
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-gray-100 py-5 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-[#22c55e] text-[#22c55e]" />
                    <span className="font-semibold text-gray-900">{product.season}</span>
                  </div>
                  <span className="h-4 w-px bg-gray-200" />
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-gray-400" />
                    <span>{product.origin}</span>
                  </div>
                  <span className="h-4 w-px bg-gray-200" />
                  <div className="flex items-center gap-1.5">
                    <Clock3 size={14} className="text-gray-400" />
                    <span>{product.stockQuantity} in stock</span>
                  </div>
                </div>

                {/* Price */}
                <div className="card-base p-6">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                        Price
                      </p>
                      <p className="text-4xl font-bold text-gray-900">
                        ${product.price} <span className="text-base font-normal text-gray-500">/ {product.unit}</span>
                      </p>
                    </div>
                    <span className="rounded-full bg-[#22c55e]/10 px-3 py-1 text-xs font-semibold text-[#22c55e]">
                      {product.season}
                    </span>
                  </div>

                  <CartBtn user={user} product={product} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Description */}
      <AnimatedSection>
        <section className="bg-gray-50 section-padding">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[0.35fr_0.65fr]">
              <h2 className="text-3xl font-bold text-gray-900">
                Description
              </h2>
              <p className="max-w-2xl text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Specs */}
      <AnimatedSection>
        <section className="section-padding">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[0.35fr_0.65fr]">
              <h2 className="text-3xl font-bold text-gray-900">
                Details
              </h2>

              <dl className="card-base max-w-2xl divide-y divide-gray-100">
                {[
                  ["Category", product.category],
                  ["Origin", product.origin],
                  ["Season", product.season],
                  ["Stock", `${product.stockQuantity} available`],
                  ["Nutrition Info", product.nutritionInfo],
                  ["Featured", product.featured ? "Yes" : "No"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between px-6 py-4 text-sm"
                  >
                    <dt className="text-gray-500">{label}</dt>
                    <dd className="font-semibold text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default ProductDetails;
