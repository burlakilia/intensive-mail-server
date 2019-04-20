const { Route } = require('./libs/route');

exports.WebhooksRoute = class WebhooksRoute extends Route {

  constructor(router) {
    super(router, 'webhooks');
    this.register('post', '/yandexpdd', this.yandexPddWebhook);
  }

  async yandexPddWebhook(ctx) {
    console.log('yandexWebhook:', ctx.body);
  }

}