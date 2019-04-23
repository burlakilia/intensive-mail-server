const { Route } = require('./libs/route');
const sessions  = require('./libs/sessions');
const generator = require('random-profile-generator');

const COUNT = 10;

class AuthRoute extends Route {

  constructor(router, base, api) {
    super(router, base, api);
    this.register('post', '/signin', this.signin);
    this.register('post', '/signup', this.signup);
    this.register('get', '/password/check', this.getPasswordStrength);
    this.register('get', '/emails/free', this.getFreeEmails);
  }

  async signin(ctx) {
    const { body } = ctx.request;
    const account = await this.api.getAccount(body.email);
    const token = await sessions.create(body.email, body.pwd);

    return {
      token
    }
  }

  async signup(ctx) {
    const { body } = ctx.request;
    const result = await this.api.createAccount(body);
    const token = await sessions.create(result.email, result.pwd);

    return { token };
  }

  async verify() {
    return {
      email: 'burlakilia@bk.ru'
    }
  }

  async getFreeEmails() {
    const accounts = await this.api.getAccounts();
    const { domains } = await this.api.getDomains();
    const result = [];

    console.log('exist accounts', accounts);

    while (result.length < COUNT) {
      result.push(generator.profile().email.replace(/\@(.*)$/i, `@${domains[0].name}`));
    }

    return result;
  }

  async getPasswordStrength() {
    return {
      strength: 1
    };
  }

}

exports.AuthRoute = AuthRoute;