import Pagination from "@/components/Pagination";
import usePagination from "@/hooks/usePagination";
import { albums } from "@/lib/constants";
import { createFileRoute, Link } from "@tanstack/react-router";

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
    <main className="w-full max-w-[68rem] mx-auto px-4 md:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {paginatedAlbums.map((album) => (
          <Link
            to="/discography/$slug"
            params={{ slug: album.slug }}
            className="flex flex-col group"
            key={album.name}
          >
            <div className="w-full aspect-square overflow-hidden">
              <img
                src={album.image}
                alt={album.name}
                className="w-full h-full object-cover group-hover:brightness-35 cursor-pointer transition-all duration-100"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between items-center pt-3 pb-4 group-hover:cursor-pointer gap-1 sm:gap-0">
              <div className="text-base sm:text-lg font-bold group-hover:scale-103 transition-all duration-100">
                {album.name}
              </div>
              <div className="text-sm sm:text-base font-medium text-neutral-700 sm:text-right flex-shrink-0">
                {album.releaseDate}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={albumPage}
        onPageChange={setAlbumPage}
        totalPages={totalPages}
      />
    </main>
  );
}
