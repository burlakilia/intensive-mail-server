const { Route } = require('./libs/route');
const { SystemError } = require('./libs/error');

class SettingsRoute extends Route {

  constructor(router, base, api) {
    super(router, base, api);
    this.register('get', '/', this.getAccount, true);
    this.register('post', '/', this.updateAccount, true);
  }

  async getAccount(ctx, session) {
    return await this.api.getAccount(session.email);
  }

  async updateAccount(ctx) {
    const { body } = ctx.request;

    if (!body.id) {
      throw new SystemError(400, { id: 'required', success: false });
    }

    return await this.api.updateAccount(body);
  }

}

exports.SettingsRoute = SettingsRoute;