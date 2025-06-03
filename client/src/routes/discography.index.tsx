import { createFileRoute, Link } from "@tanstack/react-router";

import { albums } from "@/lib/constants";
import usePagination from "@/hooks/usePagination";
import Pagination from "@/components/Pagination";

export const Route = createFileRoute("/discography/")({
  component: DiscographyPage,
});

function DiscographyPage() {
  const {
    page: albumPage,
    setPage: setAlbumPage,
    totalPages,
    paginatedItems: paginatedAlbums,
  } = usePagination(albums, 3);

  return (
    <main className="mx-auto w-full max-w-[68rem] px-4 md:px-0">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3">
        {paginatedAlbums.map((album) => (
          <Link
            key={album.name}
            className="group flex flex-col"
            params={{ slug: album.slug }}
            to="/discography/$slug"
          >
            <div className="aspect-square w-full overflow-hidden">
              <img
                alt={album.name}
                className="h-full w-full cursor-pointer object-cover transition-all duration-100 group-hover:brightness-35"
                src={album.image}
              />
            </div>
            <div className="flex flex-col items-center gap-1 pt-3 pb-4 group-hover:cursor-pointer sm:flex-row sm:justify-between sm:gap-0">
              <div className="text-base font-bold transition-all duration-100 group-hover:scale-103 sm:text-lg">
                {album.name}
              </div>
              <div className="flex-shrink-0 text-sm font-medium text-neutral-700 sm:text-right sm:text-base">
                {album.releaseDate}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={albumPage}
        totalPages={totalPages}
        onPageChange={setAlbumPage}
      />
    </main>
  );
}
