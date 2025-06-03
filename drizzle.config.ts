import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config({ path: ".dev.vars" });

export default defineConfig({
  out: "./drizzle",
  schema: "./server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env["DATABASE_URL"]!,
  },
});
