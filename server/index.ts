import { Hono } from "hono";

export type Env = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Env }>().basePath("/api");

app.get("/", (c) => {
  return c.json({
    message: "Hello NewJeans!",
  });
});

export default app;
