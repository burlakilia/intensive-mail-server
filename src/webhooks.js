const { Route } = require('./libs/route');

exports.WebhooksRoute = class WebhooksRoute extends Route {

  constructor(router, base, api) {
    super(router, base, api);
    this.register('get', '/yandexpdd', this.yandexPddWebhook);
  }

  async yandexPddWebhook(ctx) {
    const { request } = ctx;

    this.api.token = request.query.access_token;
    console.log('update token:', request.query.access_token);
    return { ok: true };
  }

}