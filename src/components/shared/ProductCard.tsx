import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock3 } from "lucide-react";

interface ProductCardProps {
  item: Product;
}

export default function ProductCard({ item }: ProductCardProps) {
  return (
    <div className="group card-base card-hover overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={item.imageUrl}
          alt={item.fruitName}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-700 shadow-sm">
          {item.category}
        </span>

        {item.featured && (
          <span className="absolute right-3 top-3 rounded-full bg-[#22c55e] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm">
            Featured
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="line-clamp-1 text-lg font-bold text-gray-900">
          {item.fruitName}
        </h3>

        <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-gray-600">
          {item.shortDescription}
        </p>

        <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Star size={12} className="fill-[#22c55e] text-[#22c55e]" />
            {item.season}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {item.origin}
          </span>
          <span className="flex items-center gap-1">
            <Clock3 size={12} />
            {item.stockQuantity} in stock
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              Price
            </p>
            <p className="text-xl font-bold text-gray-900">
              ${item.price} <span className="text-sm font-normal text-gray-500">/ {item.unit}</span>
            </p>
          </div>

          <Link
            href={`/fruit/${item._id}`}
            className="rounded-full bg-[#0E1F2B] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#22c55e]"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}