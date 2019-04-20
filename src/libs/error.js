class SystemError extends Error {
  constructor(status, reasons) {
    super();
    this.status = status;
    this.reasons = reasons;
  }
}

exports.SystemError = SystemError;