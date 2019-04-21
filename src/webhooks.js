const { Route } = require('./libs/route');

exports.WebhooksRoute = class WebhooksRoute extends Route {

  constructor(router, base, pdd) {
    super(router, base);
    this.register('get', '/yandexpdd', this.yandexPddWebhook);
  }

  async yandexPddWebhook(ctx) {
    console.log('yandexWebhook:', ctx.body, ctx);
  }

}