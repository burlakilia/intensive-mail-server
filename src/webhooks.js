const { Route } = require('./libs/route');

exports.WebhooksRoute = class WebhooksRoute extends Route {

  constructor(router, base, api) {
    super(router, base, api);
    this.register('get', '/yandexpdd', this.yandexPddWebhook);
    this.register('get', '/events', this.events)
  }

  async yandexPddWebhook(ctx) {
    const { request } = ctx;

    this.api.accessToken = request.query.access_token;
    console.log('update token:', this.api.accessToken);
    return { ok: true };
  }

  async events(ctx) {
    console.log('!EVNENTS');
    console.log(ctx);
  }

};
