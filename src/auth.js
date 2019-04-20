const { Route } = require('./libs/route');
const { sessions } = require('./libs/sessions');

class AuthRoute extends Route {

  constructor(router) {
    super(router, 'auth');
    this.register('get', '/signin', this.signin);
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
    return {heroku git:remote -a intensive-mail-server
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