const Koa = require('koa');
const Router = require('koa-router');
const { AuthRoute } = require('./auth');
const { MessagesRoute } = require('./messages');
const { WebhooksRoute } = require('./webhooks');
const { PddToken } = require('./libs/pdd');
const { SettingsRoute } = require('./settings');

const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();


const pdd = new PddToken(process.env.PDD_TOKEN);
const auth = new AuthRoute(router, 'auth', pdd);
const webhooks = new WebhooksRoute(router, 'webhooks', pdd);
const messages = new MessagesRoute(router, 'messages', pdd);
const settings = new SettingsRoute(router, 'settings', pdd);

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve('./static'));

app.listen(process.env.PORT || 3005);