import HmacSHA256 from "crypto-js/hmac-sha256";
import encHex from "crypto-js/enc-hex";


import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { 
  createCheckout, 
  getSubscription
} from "@lemonsqueezy/lemonsqueezy.js";

import { db } from "@/db/drizzle";
import { setupLemon } from "@/lib/ls";
import { subscriptions } from "@/db/schema";

setupLemon();

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
const app = new Hono()
  .get(
    "/current",
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [subscription] = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, auth.userId));

      return c.json({ data: subscription || null });
    },
  )
  .post(
    "/checkout",
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [existing] = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, auth.userId));

      if (existing?.subscriptionId) {
        const subscription = await getSubscription(
          existing.subscriptionId,
        );
        const portalUrl = subscription.data?.data.attributes.urls.customer_portal;

        if (!portalUrl) {
          return c.json({ error: "Internal error" }, 500);
        }

        return c.json({ data: portalUrl });
      }

      const checkout = await createCheckout(
        process.env.LEMONSQUEEZY_STORE_ID!,
        process.env.LEMONSQUEEZY_PRODUCT_ID!,
        {
          checkoutData: {
            custom: {
              user_id: auth.userId,
            },
          },
          productOptions: {
            redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL!}/`,
          }
        },
      );

      const checkoutUrl = checkout.data?.data.attributes.url;

      if (!checkoutUrl) {
        return c.json({ error: "Internal error" }, 500);
      }

      return c.json({ data: checkoutUrl });
    },
  )
  .post(
    "/webhook",
    async (c) => {
      const text = await c.req.text();
//const hmac = SHA256(process.env.LEMONSQUEEZY_WEBHOOK_SECRET!).toString();
const digest = HmacSHA256(
  text,
  process.env.LEMONSQUEEZY_WEBHOOK_SECRET!
).toString(encHex);
      const signature = Buffer.from(
        c.req.header("x-signature") as string,
        "utf8"
      );
//TODO: change function
if (!signature || !timingSafeEqual(digest, signature)) {
  return c.json({ error: "Unauthorized" }, 401);
}

      const payload = JSON.parse(text);
      const event = payload.meta.event_name;

      const subscriptionId = payload.data.id;
      const userId = payload.meta.custom_data.user_id;
      const status = payload.data.attributes.status;

      const [existing] = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.subscriptionId, subscriptionId));

      if (event === "subscription_created") {
        if (existing) {
          await db
          .update(subscriptions)
          .set({
            status,
          })
          .where(eq(subscriptions.subscriptionId, subscriptionId));
        } else {
          await db
            .insert(subscriptions)
            .values({
              id: createId(),
              subscriptionId,
              userId,
              status,
            });
        }
      }

      if (event === "subscription_updated") {
        if (existing) {
          await db
          .update(subscriptions)
          .set({
            status,
          })
          .where(eq(subscriptions.subscriptionId, subscriptionId));
        } else {
          await db
            .insert(subscriptions)
            .values({
              id: createId(),
              subscriptionId,
              userId,
              status,
            });
        }
      }

      return c.json({}, 200);
    },
  );

export default app;
