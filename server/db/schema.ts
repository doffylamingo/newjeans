import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const albums = pgTable("albums", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name"),
  releaseDate: text("release_date"),
  image: text("image"),
});
