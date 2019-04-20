const { Route } = require('./libs/route');
const { sessions } = require('./libs/sessions');

class AuthRoute extends Route {

  constructor(router) {
    super(router, 'auth');
    this.register('post', '/signin', this.signin);
    this.register('post', '/signup', this.signin);
    this.register('get', '/password/check', this.getPasswordStrength);
    this.register('get', '/emails/free', this.getPasswordStrength);
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