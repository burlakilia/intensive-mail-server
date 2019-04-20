const Koa = require('koa');
const Router = require('koa-router');
const { AuthRoute } = require('./auth');

const app = new Koa();
const router = new Router();

const auth = new AuthRoute(router);


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.PORT || 3005);