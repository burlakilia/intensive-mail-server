const request = require('request-promise');

const REFRESH_TIME = 1000 * 60 * 60;

exports.PddToken = class PddToken {

  start(token) {
    this.token = token;
    console.log('token found', this.token);

    this.refresh().then(() => {
      console.log('token refreshed');
    });
  }

  async refresh() {
    const result = await request.post(`https://oauth.yandex.ru/token`, {
      grant_type: 'refresh_token',
      refresh_token: this.token
    });

    consoel.log(result);

    setTimeout(() => this.refresh(), REFRESH_TIME);
  }

}
}