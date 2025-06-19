import { handleImageRefresh } from "@/app/api/utils";

import { prisma } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

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
    return Response.json({
      error: "Album not found",
    });

  if (results.images.length > 0) {
    await handleImageRefresh(results.images);
  }

  return Response.json({
    slug: results.slug,
    name: results.name,
    releaseDate: results.releaseDate,
    cover: results.cover,
    tracks: results.tracks,
    images: results.images,
    videos: results.videos,
  });
}
