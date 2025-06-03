CREATE TABLE "albums" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text,
	"release_date" text,
	"image" text,
	CONSTRAINT "albums_slug_unique" UNIQUE("slug")
);
