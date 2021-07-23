import { helpers, Router } from "https://deno.land/x/oak@v8.0.0/mod.ts";
import type { Context } from "https://deno.land/x/oak@v8.0.0/mod.ts"

const router = new Router();

router.get("/users", (ctx: Context) => {
  ctx.response.body = Array.from(ctx.state.models.users.values());
});

router.get("/users/:userId", (ctx: Context) => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true });
  ctx.response.body = ctx.state.models.users.get(userId);
});

export default router;
