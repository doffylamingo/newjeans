import { Image } from "@generated/prisma";

import { prisma } from "@/lib/db";

export interface RefreshedUrlResponse {
  refreshed_urls: RefreshedUrl[];
}

export interface RefreshedUrl {
  original: string;
  refreshed: string;
}

export async function handleImageRefresh(imageList: Image[]) {
  const token = process.env.DISCORD_AUTH_TOKEN!;

  const now = new Date();
  const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);

  const oldImages = imageList.filter(
    (img) => new Date(img.lastRefreshed) < twelveHoursAgo,
  );

  if (oldImages.length === 0) return;

  const chunkSize = 50;

  try {
    for (let i = 0; i < oldImages.length; i += chunkSize) {
      const chunk = oldImages.slice(i, i + chunkSize);

      const refreshResponse = (await refreshUrls(
        chunk.map((img) => img.src),
        token,
      )) as RefreshedUrlResponse;

      for (const item of refreshResponse.refreshed_urls) {
        const imageToUpdate = chunk.find(
          (img) => parseURL(img.src) === item.original,
        );

        if (imageToUpdate) {
          await prisma.image.update({
            where: {
              id: imageToUpdate.id,
            },
            data: {
              src: item.refreshed,
              lastRefreshed: now,
            },
          });

          imageToUpdate.src = item.refreshed;
          imageToUpdate.lastRefreshed = now;
        }
      }
    }
  } catch (error) {
    console.error("Image refresh failed:", error);
  }
}

export function parseURL(url: string): string {
  try {
    const parsed = new URL(url);

    return parsed.origin + parsed.pathname;
  } catch (error) {
    console.error("Invalid URL:", error);
    throw new Error("Failed to parse URL");
  }
}

export async function refreshUrls(urls: string[], token: string) {
  const parsedUrls = urls.map((url) => parseURL(url));

  const res = await fetch(
    "https://discord.com/api/v9/attachments/refresh-urls",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        attachment_urls: parsedUrls,
      }),
    },
  );

  if (!res.ok) throw new Error(`Failed to refresh URLs: ${res.status}`);

  return await res.json();
}
