const { Route } = require('./libs/route');
const sessions  = require('./libs/sessions');

class MessagesRoute extends Route {

  constructor(router, base, api) {
    super(router, base, api);
    this.register('get', '/', this.getMessages, true);
  }

  async getMessages(ctx, session) {
    return await session.getMessages();
  }

}

exports.MessagesRoute = MessagesRoute;