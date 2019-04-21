class SystemError extends Error {
  constructor(status, reasons) {
    super();
    this.status = status;
    this.reasons = reasons;
  }
}

class YandexError extends SystemError {
  constructor(status, reasons) {
    super(status, reasons);
    this.message = `Yadnex error: ${this.message}`;
  }
}

exports.SystemError = SystemError;
exports.YandexError = YandexError;