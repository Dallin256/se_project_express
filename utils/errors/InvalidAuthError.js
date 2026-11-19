export class InvalidAuthError extends Error {
  constructor(msg) {
    super(msg || "Authorization Required");
    this.statusCode = 401;
  }
}
