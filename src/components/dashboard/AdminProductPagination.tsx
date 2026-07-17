import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";


function buildHref(searchParams: Record<string, string | string[] | undefined>, page: number) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== undefined) {
      params.set(key, String(value));
    }
  }
  params.set("page", String(page));
  return `/dashboard/admin/products?${params.toString()}`;
}

export default function AdminProductPagination({
  currentPage,
  totalPage,
  searchParams = {},
}: {
  currentPage: number;
  totalPage: number;
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  return (

    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={buildHref(searchParams, currentPage - 1)} />
          </PaginationItem>
        )}

        {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink href={buildHref(searchParams, page)} isActive={page === currentPage}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPage < totalPage && (
          <PaginationItem>
            <PaginationNext href={buildHref(searchParams, currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>

  );
}