"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const seasons = ["Spring", "Summer", "Autumn", "Winter", "Year-round"];

const SeasonFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSeason = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    const selectedValue = value ?? "all";

    if (selectedValue === "all") {
      params.delete("season");
    } else {
      params.set("season", selectedValue);
    }

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      value={searchParams.get("season") || "all"}
      onValueChange={handleSeason}
    >
      <SelectTrigger className="w-full sm:w-52">
        <SelectValue placeholder="All Seasons" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All Seasons</SelectItem>

        {seasons.map((season) => (
          <SelectItem key={season} value={season}>
            {season}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SeasonFilter;