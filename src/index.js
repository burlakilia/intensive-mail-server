const Koa = require('koa');
const Router = require('koa-router');
const { AuthRoute } = require('./auth');
const { WebhooksRoute } = require('./webhooks');
const { PddToken } = require('./libs/token');

const app = new Koa();
const router = new Router();

const auth = new AuthRoute(router);
const webhooks = new WebhooksRoute(router);
const token = new PddToken();

token.start(process.env.PDD_TOKEN);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.PORT || 3005);