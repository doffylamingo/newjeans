import React from "react";
import { Image } from "@generated/prisma";

import Gallery from "@/components/Gallery";

async function fetchImages() {
  const res = await fetch("http://localhost:3000/api/images");

  return res.json();
}

export default async function page() {
  const images: Image[] = await fetchImages();

  return (
    <main className="mx-auto min-h-screen w-full max-w-[68rem] px-4 py-6 md:px-0 md:py-8">
      <Gallery images={images} />
    </main>
  );
}
