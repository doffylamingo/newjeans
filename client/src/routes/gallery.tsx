import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { gallery } from "@/lib/constants";
import usePagination from "@/hooks/usePagination";
import Gallery from "@/components/Gallery";
import Pagination from "@/components/Pagination";

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
