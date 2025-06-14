import { relations } from "drizzle-orm";
import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const albums = pgTable("albums", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  releaseDate: text("release_date").notNull(),
  image: text("image").notNull(),
});

export const tracks = pgTable("tracks", {
  id: serial("id").primaryKey(),
  albumId: integer("album_id")
    .references(() => albums.id)
    .notNull(),
  name: text("name").notNull(),
  duration: text("duration").notNull(),
});

export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  albumId: integer("album_id")
    .references(() => albums.id)
    .notNull(),
  name: text("name").notNull(),
  videoId: text("video_id").notNull(),
  date: text("date").notNull(),
});

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  albumId: integer("album_id").references(() => albums.id),
  src: text("src").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  lastRefreshed: timestamp("last_refreshed").defaultNow().notNull(),
});

export const albumsRelations = relations(albums, ({ many }) => ({
  tracks: many(tracks),
  videos: many(videos),
  images: many(images),
}));

export const tracksRelations = relations(tracks, ({ one }) => ({
  album: one(albums, {
    fields: [tracks.albumId],
    references: [albums.id],
  }),
}));

export const videosRelations = relations(videos, ({ one }) => ({
  album: one(albums, {
    fields: [videos.albumId],
    references: [albums.id],
  }),
}));

export const imagesRelations = relations(images, ({ one }) => ({
  album: one(albums, {
    fields: [images.albumId],
    references: [albums.id],
  }),
}));
