import { prisma } from "@/lib/db";

export async function GET() {
  const results = await prisma.album.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return Response.json(results);
}
