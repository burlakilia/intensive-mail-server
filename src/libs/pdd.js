const request = require('request-promise');
const { YandexError, SystemError } = require('./error');

const REFRESH_TIME = 1000 * 60 * 60;

const PDD_HOST = 'https://pddimp.yandex.ru';
const CONNECT_HOST = 'https://api.directory.yandex.net';

exports.PddToken = class PddToken {

  constructor() {
    this.pddToken = 'FQZWOMRLLWALYZMXNUK4D3NVUMNSUS72LAHQ3RXSKVBW6CEAKL6A';
    this.accessToken = 'AQAAAAAQv75YAAWf4GcGVv4ZWUOImCpWg3oYsy0';
  }

  async request(method, options) {
    try {
      return this.processResult(await request[method](options));
    } catch (err) {
      throw new SystemError(err.statusCode, err.error);
    }
  }

  processResult(result) {
    let data;

    if (result.body && typeof result.body !== 'string') {
      return result.body;
    }

    if (typeof result === 'string') {
      try {
        data = JSON.parse(result);
      } catch (error) {
        console.log('invalid response ', result);
        throw new YandexError(500, {
          invalid: 'response parse error'
        })
      }

      if (data.success === 'error') {
        throw new YandexError(500, data);
      }
    } else {
      data = result;
    }

    return data;
  }

  async getDomains() {
    return this.processResult(await this.request('get', {
      url: `${PDD_HOST}/api2/admin/domain/domains`,
      headers: {
        PddToken: this.pddToken
      }
    }));
  }

  async getAccounts() {
    const { accounts = [] } = this.processResult(await this.request('get', {
      url: `${CONNECT_HOST}/v6/users/`,
      headers: {
        Authorization: `OAuth ${this.accessToken}`
      }
    }));

    return accounts;
  }

  async getAccount(email) {
    const { result = [] } = this.processResult(await this.request('get', {
      url: `${CONNECT_HOST}/v6/users/?nickname=${email.replace(/\@(.*)$/, '')}&fields=name,email,about,birthday`,
      headers: {
        Authorization: `OAuth ${this.accessToken}`
      }
    }));

    console.log(result,  `${CONNECT_HOST}/v6/users/?nickname=${email.replace(/\@(.*)$/, '')}`);

    return result[0];
  }

  async updateAccount(body) {
    const id = body.id;
    delete body.id;

    return this.processResult(await this.request('patch', {
      url: `${CONNECT_HOST}/v6/users/${id}`,
      headers: {
        Authorization: `OAuth ${this.accessToken}`,
        json: body
      }
    }));
  }

  async createAccount(data) {
    return this.processResult(await this.request('post', {
      url: `${CONNECT_HOST}/v6/users/`,
      headers: {
        Authorization: `OAuth ${this.accessToken}`
      },
      json: {
        department_id: 1,
        nickname: data.name,
        password: data.pwd
      }
    }));
  }

};
