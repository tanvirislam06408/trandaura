"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SortFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSort = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    const selectedValue = value ?? "default";

    if (selectedValue === "default") {
      params.delete("sort");
    } else {
      params.set("sort", selectedValue);
    }

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      value={searchParams.get("sort") || "default"}
      onValueChange={handleSort}
    >
      <SelectTrigger className="w-full sm:w-52">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="default">Sort By</SelectItem>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="price_asc">Price: Low → High</SelectItem>
        <SelectItem value="price_desc">Price: High → Low</SelectItem>
        <SelectItem value="name_asc">Name: A → Z</SelectItem>
        <SelectItem value="name_desc">Name: Z → A</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortFilter;