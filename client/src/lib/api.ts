import type { AppType } from "@server/index";
import { hc } from "hono/client";

const client = hc<AppType>("/");

export const api = client.api;
