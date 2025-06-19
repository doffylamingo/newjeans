import { prisma } from "@/lib/db";

import { handleImageRefresh } from "../utils";

export async function GET() {
  const results = await prisma.image.findMany({
    orderBy: {
      id: "desc",
    },
  });

  await handleImageRefresh(results);

  return Response.json(results);
}
