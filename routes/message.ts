import { helpers, Router } from "https://deno.land/x/oak@v8.0.0/mod.ts";
import type { Context } from "https://deno.land/x/oak@v8.0.0/mod.ts";

const router = new Router();

router.get("/messages", (ctx: Context) => {
  ctx.response.body = Array.from(ctx.state.models.messages.values());
});

router.get("/messages/:messageId", (ctx: Context) => {
  const { messageId } = helpers.getQuery(ctx, { mergeParams: true });
  ctx.response.body = ctx.state.models.messages.get(messageId);
});

router.post("/messages", async (ctx: Context) => {
  const id = globalThis.crypto.randomUUID();

  const { value } = ctx.request.body({ type: "json" });
  const { text } = await value;

  ctx.state.models.messages.set(id, {
    id,
    text,
    userId: ctx.state.me.id,
  });

  ctx.response.body = ctx.state.models.messages.get(id);
});

router.delete("/messages/:messageId", (ctx: Context) => {
  const { messageId } = helpers.getQuery(ctx, { mergeParams: true });

  const isDeleted = ctx.state.models.messages.delete(messageId);

  ctx.response.body = isDeleted;
});

export default router;
