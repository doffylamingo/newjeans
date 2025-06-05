ALTER TABLE "albums" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "albums" ALTER COLUMN "release_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "albums" ALTER COLUMN "image" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tracks" ALTER COLUMN "duration" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "videos" ALTER COLUMN "date" SET NOT NULL;