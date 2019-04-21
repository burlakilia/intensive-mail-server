const Koa = require('koa');
const Router = require('koa-router');
const { AuthRoute } = require('./auth');
const { WebhooksRoute } = require('./webhooks');
const { PddToken } = require('./libs/pdd');

const serve = require('koa-static');
const app = new Koa();
const router = new Router();

const pdd = new PddToken(process.env.PDD_TOKEN);
const auth = new AuthRoute(router, 'auth', pdd);
const webhooks = new WebhooksRoute(router, 'webhooks', pdd);


app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve('./src'));

app.listen(process.env.PORT || 3005);