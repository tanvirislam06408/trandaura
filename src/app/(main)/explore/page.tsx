import CategoryFilter from "@/components/shared/CategoryFilter";
import ProductCard from "@/components/shared/ProductCard";
import ProductsPagination from "@/components/shared/ProductsPagination";
import SearchBar from "@/components/shared/SearchBar";
import SortFilter from "@/components/shared/SortFilter";
import SeasonFilter from "@/components/shared/SeasonFilter";
import { serverFetch } from "@/lib/core/server";
import { Product } from "@/types/product";
import { ProductsResponse } from "@/types/ProductsResponse";
import { Search } from "lucide-react";


interface ExplorePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}


const ExplorePage = async ({ searchParams }: ExplorePageProps) => {
  const params = await searchParams;


  const currentPage = Number(params.page) || 1;
  const search = params.search?.toString() || "";
  const category = params.category?.toString() || "";
  const season = params.season?.toString() || "";
  const sort = params.sort?.toString() || "";

  const query = new URLSearchParams();

  query.set("page", currentPage.toString());

  if (search) {
    query.set("search", search);
  }

  if (category) {
    query.set("category", category);
  }

  if (season) {
    query.set("season", season);
  }

  if (sort) {
    query.set("sort", sort);
  }

  const url = `/products?${query.toString()}`;

 console.log(url);
 
  const productData = await serverFetch<ProductsResponse>(url);
  console.log(currentPage);


  const { totalPages } = productData;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Explore Fresh Fruits
        </h1>
        <p className="mt-2 text-gray-500">
          Discover the finest organic and seasonal fruits from trusted farms.
        </p>
      </div>

      {/* Search + Filter + Sort */}
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <SearchBar/>

        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Category */}
         <CategoryFilter/>

          {/* Season */}
          <SeasonFilter/>

          {/* Sort */}
          <SortFilter/>
        </div>
      </div>

      {/* Result Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-black">
            {productData.products.length}
          </span>{" "}
          products
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-10">
        {productData.products.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>

      {/* Pagination UI */}
      <ProductsPagination currentPage={currentPage} totalPage={totalPages} searchParams={params} />
    </div>
  );
};

export default ExplorePage;