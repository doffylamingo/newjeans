import React from "react";

import { prisma } from "@/lib/db";
import { handleImageRefresh } from "@/lib/utils";
import Gallery from "@/components/Gallery";

async function fetchImages() {
  const results = await prisma.image.findMany({
    orderBy: {
      id: "desc",
    },
  });

  await handleImageRefresh(results);

  return results;
}

export default async function page() {
  const images = await fetchImages();

  return (
    <main className="mx-auto min-h-screen w-full max-w-[68rem] px-4 py-6 md:px-0 md:py-8">
      <Gallery images={images} />
    </main>
  );
}
