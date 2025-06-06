import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { api } from "@/lib/api";
import usePagination from "@/hooks/usePagination";
import Gallery from "@/components/Gallery";
import Pagination from "@/components/Pagination";
import Video from "@/components/Video";

const getAlbumQueryOptions = (slug: string) => ({
  queryKey: ["album", slug],
  queryFn: async () => {
    const res = await api.albums[":slug"].$get({
      param: {
        slug,
      },
    });
    const data = await res.json();

    return data;
  },
});

export const Route = createFileRoute("/discography/$slug")({
  loader: async ({ context: { queryClient }, params: { slug } }) => {
    return queryClient.ensureQueryData(getAlbumQueryOptions(slug));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();

  const [index, setIndex] = useState(-1);

  const album = "result" in data ? data.result : null;

  const {
    page: photoPage,
    setPage: setPhotoPage,
    totalPages,
    paginatedItems: photos,
  } = usePagination(album?.images ?? [], 20);

  if (!album) {
    return (
      <main className="mx-auto flex w-full max-w-[68rem] items-center justify-center px-4 md:px-0">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            Album not found
          </h1>
          <p className="text-gray-600">
            The album you&#39;re looking for doesn&#39;t exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-[68rem] px-4 py-6 md:px-0 md:py-8">
      <div className="mb-8 flex w-full flex-col items-center justify-center md:mb-50">
        <div className="text-center">
          <div className="text-3xl font-bold uppercase md:text-4xl lg:text-7xl">
            {album.name}
          </div>
          <p className="mb-4 text-lg text-gray-600 md:mb-13 md:text-xl">
            {album.releaseDate}
          </p>
        </div>
        <div className="md:w-64 lg:w-110">
          <img
            alt={album.name}
            className="aspect-square w-full shadow-xl/25"
            src={album.cover}
          />
        </div>
      </div>

      <DiscographySection title="Track">
        <div className="flex flex-col items-center gap-y-3 py-3 md:py-4">
          {album.tracks?.map((track, index) => (
            <div
              key={index}
              className="flex w-[300px] gap-x-8 py-2 md:w-[400px]"
            >
              <div className="w-6 text-right text-xl font-bold">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="flex flex-1 justify-between">
                <div className="text-xl font-bold">{track.name}</div>
                <div className="text-xl font-bold text-neutral-500">
                  {track.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DiscographySection>

      <DiscographySection title="Gallery">
        {photos && photos.length > 0 ? (
          <>
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
          </>
        ) : (
          <p className="mt-4 text-gray-600">No photos available.</p>
        )}
      </DiscographySection>

      <DiscographySection title="Video">
        <Video videos={album.videos ?? []} />
      </DiscographySection>
    </main>
  );
}

function DiscographySection({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="mb-8 text-center md:mb-50">
      <div className="mb-13 text-3xl font-bold uppercase md:text-4xl lg:text-7xl">
        {title}
      </div>
      {children}
    </div>
  );
}
