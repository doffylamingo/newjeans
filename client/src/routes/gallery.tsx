import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { api } from "@/lib/api";
import usePagination from "@/hooks/usePagination";
import Gallery from "@/components/Gallery";
import Pagination from "@/components/Pagination";

const getImagesQueryOptions = () => ({
  queryKey: ["images"],
  queryFn: async () => {
    const res = await api.images.$get();
    const data = await res.json();

    return data;
  },
});

export const Route = createFileRoute("/gallery")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery(getImagesQueryOptions());

  const {
    page: photoPage,
    setPage: setPhotoPage,
    totalPages,
    paginatedItems: photos,
  } = usePagination(data?.result ?? [], 25);
  const [index, setIndex] = useState(-1);

  if (isLoading) {
    return (
      <main className="mx-auto w-full max-w-[68rem] px-4 pb-4 md:px-0 md:pb-12">
        <div className="animate-pulse space-y-5">
          {Array.from({ length: 3 }).map((_, rowIdx) => (
            <div
              key={rowIdx}
              className="flex gap-5"
            >
              {Array.from({ length: Math.floor(Math.random() * 3) + 2 }).map(
                (_, colIdx) => (
                  <div
                    key={colIdx}
                    className="h-[180px] flex-1 bg-gray-300"
                  />
                ),
              )}
            </div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-[68rem] px-4 py-6 md:px-0 md:py-8">
      <Gallery
        index={index}
        photos={photos}
        setIndex={setIndex}
      />
      <Pagination
        currentPage={photoPage}
        totalPages={totalPages}
        onPageChange={setPhotoPage}
      />
    </main>
  );
}
