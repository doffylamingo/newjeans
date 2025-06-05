import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const albums = pgTable("albums", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name"),
  releaseDate: text("release_date"),
  image: text("image"),
});

export const tracks = pgTable("tracks", {
  id: serial("id").primaryKey(),
  albumId: integer("album_id")
    .references(() => albums.id)
    .notNull(),
  name: text("name").notNull(),
  duration: text("duration"),
});

export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  albumId: integer("album_id")
    .references(() => albums.id)
    .notNull(),
  name: text("name").notNull(),
  videoId: text("video_id").notNull(),
  date: text("date"),
});

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  albumId: integer("album_id").references(() => albums.id),
  src: text("src").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  lastRefreshed: timestamp("last_refreshed").defaultNow().notNull(),
});
