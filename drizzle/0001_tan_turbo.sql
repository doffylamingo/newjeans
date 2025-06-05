CREATE TABLE "images" (
	"id" serial PRIMARY KEY NOT NULL,
	"album_id" integer,
	"src" text NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"last_refreshed" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tracks" (
	"id" serial PRIMARY KEY NOT NULL,
	"album_id" integer NOT NULL,
	"name" text NOT NULL,
	"duration" text
);
--> statement-breakpoint
CREATE TABLE "videos" (
	"id" serial PRIMARY KEY NOT NULL,
	"album_id" integer NOT NULL,
	"name" text NOT NULL,
	"video_id" text NOT NULL,
	"date" text
);
--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "videos" ADD CONSTRAINT "videos_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE no action ON UPDATE no action;