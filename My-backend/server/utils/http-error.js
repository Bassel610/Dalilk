class HttpError extends Error {
  constructor(status, message, code) {
    super(message);
    this.status = status;
    this.code = code || `E${status}`;
  }
}

module.exports = { HttpError };
