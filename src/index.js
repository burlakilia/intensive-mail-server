const Koa = require('koa');
const Router = require('koa-router');
const { AuthRoute } = require('./auth');
const { WebhooksRoute } = require('./webhooks');

const app = new Koa();
const router = new Router();

const auth = new AuthRoute(router);
const webhooks = new WebhooksRoute(router);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.PORT || 3005);