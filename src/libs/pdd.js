const request = require('request-promise');

const REFRESH_TIME = 1000 * 60 * 60;

exports.PddToken = class PddToken {

  constructor(token) {
    this.token = token || 'AQAAAAAQv75YAAWf4D3_PTAug0d3l6vxlO1uw70';
  }

};
