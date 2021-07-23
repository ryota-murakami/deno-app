import { Router } from 'https://deno.land/x/oak@v8.0.0/mod.ts';

const router = new Router();

router.get('/session', (ctx) => {
  ctx.response.body = ctx.state.models.users.get(ctx.state.me.id);
});

export default router;
