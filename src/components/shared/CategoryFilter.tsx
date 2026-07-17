"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = ["Citrus", "Tropical", "Berries", "Seasonal", "Other"];

const CategoryFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCategory = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    const selectedValue = value ?? "all";

    if (selectedValue === "all") {
      params.delete("category");
    } else {
      params.set("category", selectedValue);
    }

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      value={searchParams.get("category") || "all"}
      onValueChange={handleCategory}
    >
      <SelectTrigger className="w-full sm:w-52">
        <SelectValue placeholder="All Categories" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>

        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;