import { serverFetch } from "../core/server";
import type { Product } from "@/types/product";

export const proudtByCategories = async (category: string) => {
  const res = await serverFetch<Product[]>(`/product/${category}`);
  return res;
};