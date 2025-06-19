import React from "react";
import Image from "next/image";
import Link from "next/link";

import { prisma } from "@/lib/db";

async function fetchAlbums() {
  const results = await prisma.album.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return results;
}

export default async function page() {
  const albums = await fetchAlbums();

  return (
    <main className="mx-auto w-full max-w-[68rem] px-4 pb-4 md:px-0 md:pb-12">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3">
        {albums.map((album) => (
          <Link
            key={album.name}
            className="group flex flex-col"
            href={`/discography/${album.slug}`}
          >
            <div className="aspect-square w-full overflow-hidden">
              <Image
                alt={album.name}
                className="h-full w-full cursor-pointer object-cover transition-all duration-100 group-hover:scale-105 group-hover:brightness-35"
                height={500}
                src={album.cover}
                width={500}
              />
            </div>
            <div className="flex flex-row items-center justify-between gap-1 pt-3 pb-4 group-hover:cursor-pointer group-hover:underline sm:gap-0">
              <div className="text-base font-bold transition-all duration-100 sm:text-lg">
                {album.name}
              </div>
              <div className="flex-shrink-0 text-sm font-medium text-neutral-700 sm:text-right sm:text-base">
                {album.releaseDate}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
