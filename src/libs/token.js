const request = require('request-promise');

const REFRESH_TIME = 1000 * 60 * 60;

class PddToken {

  constructor() {
    this.token = process.env.PDD_TOKEN;
    console.log('token found', process.env.PDD_TOKEN);

    this.refresh().then(() => {
      console.log('token refreshed');
    });
  }

  async refresh() {
    const result = await request.post(`https://oauth.yandex.ru/token?grant_type=refresh_token&refresh_token=${this.token}`);

    consoel.log(result);

    setTimeout(() => this.refresh(), REFRESH_TIME);
  }

}