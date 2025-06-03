import Gallery from "@/components/Gallery";
import Pagination from "@/components/Pagination";
import usePagination from "@/hooks/usePagination";
import { gallery } from "@/lib/constants";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/gallery")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    page: photoPage,
    setPage: setPhotoPage,
    totalPages,
    paginatedItems: photos,
  } = usePagination(gallery ?? [], 15);
  const [index, setIndex] = useState(-1);

  return (
    <main className="w-full min-h-screen max-w-[68rem] mx-auto px-4 md:px-0 py-6 md:py-8">
      <Gallery photos={photos} index={index} setIndex={setIndex} />
      <Pagination
        currentPage={photoPage}
        onPageChange={setPhotoPage}
        totalPages={totalPages}
      />
    </main>
  );
}
