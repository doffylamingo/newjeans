import React from "react";
import Image from "next/image";

import { prisma } from "@/lib/db";
import { handleImageRefresh } from "@/lib/utils";
import Gallery from "@/components/Gallery";
import Video from "@/components/Video";

async function fetchAlbum(slug: string) {
  const results = await prisma.album.findFirst({
    where: {
      slug,
    },
    include: {
      tracks: true,
      images: true,
      videos: true,
    },
  });

  if (!results)
    return {
      error: "Album not found",
    };

  if (results.images.length > 0) {
    await handleImageRefresh(results.images);
  }

  return {
    slug: results.slug,
    name: results.name,
    releaseDate: results.releaseDate,
    cover: results.cover,
    tracks: results.tracks,
    images: results.images,
    videos: results.videos,
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const album = await fetchAlbum(slug);

  if (album.error) return <div>{album.error}</div>;

  return (
    <main className="mx-auto min-h-screen w-full max-w-[68rem] px-4 py-6 md:px-0 md:py-8">
      <div className="mb-15 flex w-full flex-col items-center justify-center md:mb-50">
        <div className="text-center">
          <div className="font-inter text-3xl font-bold tracking-wide uppercase md:text-4xl lg:text-7xl">
            {album.name}
          </div>
          <p className="mb-4 text-base text-gray-600 md:mb-13 md:text-xl">
            {album.releaseDate}
          </p>
        </div>
        <div className="md:w-64 lg:w-110">
          <Image
            alt={album.name ?? ""}
            className="aspect-square w-full shadow-xl/25"
            height={500}
            src={album.cover ?? ""}
            width={500}
          />
        </div>
      </div>

      <DiscographySection title="Track">
        <div className="flex flex-col items-center">
          {album.tracks?.map((track, index) => (
            <div
              key={index}
              className="flex w-[300px] gap-x-8 pb-2 md:w-[400px]"
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

      <DiscographySection title="Video">
        <Video videos={album.videos ?? []} />
      </DiscographySection>

      <DiscographySection title="Gallery">
        {album.images && album.images.length > 0 ? (
          <Gallery images={album.images} />
        ) : (
          <p className="mt-4 text-gray-600">No photos available.</p>
        )}
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
    <div className="mb-15 text-center md:mb-50">
      <div className="font-inter mb-13 text-3xl font-bold tracking-wide uppercase md:text-4xl lg:text-7xl">
        {title}
      </div>
      {children}
    </div>
  );
}
