import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { api } from "@/lib/api";
import usePagination from "@/hooks/usePagination";
import Gallery from "@/components/Gallery";
import Pagination from "@/components/Pagination";

const getImagesQueryOptions = () => ({
  queryKey: ["discography"],
  queryFn: async () => {
    const res = await api.images.$get();
    const data = await res.json();

    return data;
  },
});

export const Route = createFileRoute("/gallery")({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(getImagesQueryOptions());
  },
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const {
    page: photoPage,
    setPage: setPhotoPage,
    totalPages,
    paginatedItems: photos,
  } = usePagination(data.result, 25);
  const [index, setIndex] = useState(-1);

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
