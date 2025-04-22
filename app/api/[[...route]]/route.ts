import { Hono } from "hono";
import { handle } from "hono/vercel";

import accounts from "./accounts";
import categories from "./categories";
import summary from "./summary";
import transactions from "./transactions";
import plaid from "./plaid";
import subscriptions from "./subscriptions";
export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app
  .route("/plaid",plaid)
  .route("/subscriptions",subscriptions)
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("/summary", summary)
  .route("/transactions", transactions);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;