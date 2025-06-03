import { albums } from "@/lib/constants";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import Gallery from "@/components/Gallery";
import Pagination from "@/components/Pagination";
import usePagination from "@/hooks/usePagination";
import Video from "@/components/Video";

export const Route = createFileRoute("/discography/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();
  const [index, setIndex] = useState(-1);

  const album = albums.find((album) => album.slug === slug);

  const {
    page: photoPage,
    setPage: setPhotoPage,
    totalPages,
    paginatedItems: photos,
  } = usePagination(album?.photos ?? [], 10);

  if (!album) {
    return (
      <main className="w-full min-h-screen max-w-[68rem] mx-auto px-4 md:px-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Album not found
          </h1>
          <p className="text-gray-600">
            The album you're looking for doesn't exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen max-w-[68rem] mx-auto px-4 md:px-0 py-6 md:py-8">
      <div className="mb-8 md:mb-50 w-full flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="uppercase text-3xl md:text-4xl lg:text-7xl font-bold">
            {album.name}
          </div>
          <p className="text-lg md:text-xl text-gray-600 mb-4 md:mb-13">
            {album.releaseDate}
          </p>
        </div>
        <div className="md:w-64 lg:w-110">
          <img
            src={album.image}
            alt={album.name}
            className="w-full aspect-square shadow-xl/25"
          />
        </div>
      </div>

      <DiscographySection title="Track">
        <div className="flex flex-col gap-y-3 py-3 md:py-4 items-center">
          {album.tracks?.map((track, index) => (
            <div
              key={index}
              className="flex gap-x-8 py-2 w-[300px] md:w-[400px]"
            >
              <div className="text-xl text-right w-6 font-bold">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="flex justify-between flex-1">
                <div className="text-xl font-bold">{track.name}</div>
                <div className="text-xl text-neutral-500 font-bold">
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
            <Gallery photos={photos} index={index} setIndex={setIndex} />
            <Pagination
              currentPage={photoPage}
              onPageChange={setPhotoPage}
              totalPages={totalPages}
            />
          </>
        ) : (
          <p className="text-gray-600 mt-4">No photos available.</p>
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
    <div className="mb-8 md:mb-50 text-center">
      <div className="uppercase text-3xl md:text-4xl lg:text-7xl font-bold mb-13">
        {title}
      </div>
      {children}
    </div>
  );
}
