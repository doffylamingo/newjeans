import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { Hono } from "hono";
import { albums, images } from "./db/schema";
import { eq } from "drizzle-orm";
import * as schema from "./db/schema";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { parseURL, refreshUrls } from "./utils";

export type Env = {
  DATABASE_URL: string;
  DISCORD_AUTH_TOKEN: string;
};

export type Variables = {
  db: ReturnType<typeof drizzle<typeof schema>>;
};

export interface RefreshedUrlResponse {
  refreshed_urls: RefreshedUrl[];
}

export interface RefreshedUrl {
  original: string;
  refreshed: string;
}

async function handleImageRefresh(
  db: ReturnType<typeof drizzle<typeof schema>>,
  imageList: any[],
  token: string
) {
  const now = new Date();
  const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);

  const oldImages = imageList.filter(
    (img) => new Date(img.lastRefreshed) < twelveHoursAgo
  );

  if (oldImages.length === 0) return;

  const chunkSize = 50;

  try {
    for (let i = 0; i < oldImages.length; i += chunkSize) {
      const chunk = oldImages.slice(i, i + chunkSize);

      const refreshResponse = (await refreshUrls(
        chunk.map((img) => img.src),
        token
      )) as RefreshedUrlResponse;

      for (const item of refreshResponse.refreshed_urls) {
        const imageToUpdate = chunk.find(
          (img) => parseURL(img.src) === item.original
        );

        if (imageToUpdate) {
          await db
            .update(images)
            .set({
              src: item.refreshed,
              lastRefreshed: now,
            })
            .where(eq(images.id, imageToUpdate.id));

          imageToUpdate.src = item.refreshed;
          imageToUpdate.lastRefreshed = now;
        }
      }
    }
  } catch (error) {
    console.error("Image refresh failed:", error);
  }
}

const app = new Hono<{ Bindings: Env; Variables: Variables }>().basePath(
  "/api"
);

app.use(logger());
app.use("*", cors());

app.use("*", async (c, next) => {
  const sql = neon(c.env.DATABASE_URL);
  const db = drizzle(sql, { schema });
  c.set("db", db);
  await next();
});

const route = app
  .get("/", (c) => {
    return c.json({
      message: "Hello NewJeans!",
    });
  })
  .get("/albums", async (c) => {
    try {
      const db = c.get("db");

      const result = await db.query.albums.findMany({
        orderBy: (albums, { desc }) => [desc(albums.id)],
      });

      return c.json({
        result,
      });
    } catch (error) {
      console.log(error);
      return c.json(
        {
          error,
        },
        400
      );
    }
  })
  .get("/albums/:slug", async (c) => {
    try {
      const slug = c.req.param("slug");

      const db = c.get("db");

      const result = await db.query.albums.findFirst({
        where: eq(albums.slug, slug),
        with: {
          tracks: true,
          videos: true,
          images: {
            orderBy: (images, { desc }) => [desc(images.lastRefreshed)],
          },
        },
      });

      if (!result)
        return c.json(
          {
            error: "Album not found",
          },
          404
        );

      if (result.images?.length > 0) {
        await handleImageRefresh(db, result.images, c.env.DISCORD_AUTH_TOKEN);
      }

      return c.json({
        result: {
          slug: result.slug,
          name: result.name,
          releaseDate: result.releaseDate,
          cover: result.image,
          tracks: result.tracks,
          images: result.images,
          videos: result.videos,
        },
      });
    } catch (error) {
      console.log(error);
      return c.json(
        {
          error,
        },
        400
      );
    }
  })
  .get("/videos", async (c) => {
    try {
      const db = c.get("db");

      const result = await db.query.videos.findMany({
        orderBy: (videos, { desc }) => [desc(videos.date)],
      });

      return c.json({
        result,
      });
    } catch (error) {
      console.log(error);
      return c.json(
        {
          error,
        },
        400
      );
    }
  })
  .get("/images", async (c) => {
    try {
      const db = c.get("db");

      const result = await db.query.images.findMany({
        orderBy: (images, { desc }) => [desc(images.id)],
      });

      await handleImageRefresh(db, result, c.env.DISCORD_AUTH_TOKEN);

      return c.json({ result });
    } catch (error) {
      console.log(error);
      return c.json(
        {
          error,
        },
        400
      );
    }
  });

export type AppType = typeof route;
export default app;
