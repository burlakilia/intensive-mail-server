const request = require('request-promise');
const { YandexError } = require('./error');

const REFRESH_TIME = 1000 * 60 * 60;

const HOST = 'pddimp.yandex.ru';

exports.PddToken = class PddToken {

  constructor() {
    this.pddToken = 'X4ORYJGHMO6EFWSYWBNSSA4LDYFUFNLEKEVBQVSULHCYQW3ZWF2Q';
    this.accessToken = '';
  }

  processResult(result) {
    let data;

    try {
      data = JSON.parse(result);
    } catch (error) {
      console.log('invalid response ' + result);
      throw new YandexError(500, {
        invalid: 'response parse error'
      })
    }

    if (data.success === 'error') {
      throw new YandexError(500, data);
    }

    return data;
  }

  async getAllDomains() {
    console.log(`https://${HOST}/api2/registrar/domain/domains`, this.token);

    return this.processResult(await request.get({
      url: `https://${HOST}/api2/registrar/domain/domains`,
      headers: {
        PddToken: this.pddToken
      }
    }));
  }


};
