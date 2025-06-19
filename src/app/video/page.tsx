import React from "react";

import { prisma } from "@/lib/db";
import Video from "@/components/Video";

async function fetchVideos() {
  const results = await prisma.video.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return results;
}

export default async function page() {
  const videos = await fetchVideos();

  return (
    <main className="mx-auto min-h-screen w-full max-w-[68rem] px-4 py-6 md:px-0 md:py-8">
      <Video videos={videos} />
    </main>
  );
}
