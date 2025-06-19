import React from "react";
import { Video as VideoType } from "@generated/prisma";

import Video from "@/components/Video";

async function fetchVideos() {
  const res = await fetch("http://localhost:3000/api/videos");

  return res.json();
}

export default async function page() {
  const videos: VideoType[] = await fetchVideos();

  return (
    <main className="mx-auto min-h-screen w-full max-w-[68rem] px-4 py-6 md:px-0 md:py-8">
      <Video videos={videos} />
    </main>
  );
}
