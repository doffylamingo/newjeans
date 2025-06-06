import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { api } from "@/lib/api";
import usePagination from "@/hooks/usePagination";
import Pagination from "@/components/Pagination";

const getDiscographyQueryOptions = () => ({
  queryKey: ["discography"],
  queryFn: async () => {
    const res = await api.albums.$get();
    const data = await res.json();

    return data;
  },
});

export const Route = createFileRoute("/discography/")({
  component: DiscographyPage,
});

function DiscographyPage() {
  const { data, isLoading } = useQuery(getDiscographyQueryOptions());

  const {
    page: albumPage,
    setPage: setAlbumPage,
    totalPages,
    paginatedItems: paginatedAlbums,
  } = usePagination(data?.result ?? [], 6);

  if (isLoading) {
    return (
      <main className="mx-auto w-full max-w-[68rem] px-4 pb-4 md:px-0 md:pb-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="flex animate-pulse flex-col"
            >
              <div className="aspect-square w-full bg-gray-300" />
              <div className="mt-3 space-y-2">
                <div className="h-5 bg-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[68rem] px-4 pb-4 md:px-0 md:pb-12">
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
            <div className="flex flex-row items-center justify-between gap-1 pt-3 pb-4 group-hover:cursor-pointer sm:gap-0">
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
