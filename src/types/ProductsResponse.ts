import { Product } from "./product";

export interface ProductsResponse {
  products: Product[];
  totalProducts: number;
  currentPage: number;
  totalPages: number;
}