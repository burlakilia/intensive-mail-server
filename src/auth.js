const { Route } = require('./libs/route');
const { sessions } = require('./libs/sessions');

class AuthRoute extends Route {

  constructor(router, base, api) {
    super(router, base, api);
    this.register('post', '/signin', this.signin);
    this.register('post', '/signup', this.signin);
    this.register('get', '/password/check', this.getPasswordStrength);
    this.register('get', '/emails/free', this.getFreeEmails);
  }

  saveSession(user) {
    const uid = Date.now() + '';
    sessions[uid] = user;
    console.log('add new session', uid, user);
    return uid;
  }

  async signin() {
    return {
      token: this.saveSession({ email: 'burlakilia@bk.ru' })
    }
  }

  async signup() {
    return {
      token: '12332414',
    }
  }

  async verify() {
    return {
      email: 'burlakilia@bk.ru'
    }
  }

  async getFreeEmails() {
    const data = await this.api.getAllDomains();

    console.log(data);

    return [{
      email: 'burlaki@jstest.ru'
    }];
  }

  async getPasswordStrength() {
    return {
      strength: 1
    };
  }

}

exports.AuthRoute = AuthRoute;