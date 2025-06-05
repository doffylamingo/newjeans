import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { Hono } from "hono";
import { albums } from "./db/schema";
import { eq } from "drizzle-orm";
import * as schema from "./db/schema";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

export type Env = {
  DATABASE_URL: string;
};

export type Variables = {
  db: ReturnType<typeof drizzle<typeof schema>>;
};

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

app
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

      return c.json({
        slug: result.slug,
        name: result.name,
        releaseDate: result.releaseDate,
        cover: result.image,
        tracks: result.tracks,
        images: result.images,
        videos: result.videos,
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
  });

export default app;
