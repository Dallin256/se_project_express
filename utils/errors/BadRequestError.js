export class BadRequestError extends Error {
  constructor(msg) {
    super(msg || "Bad Request");
    this.statusCode = 400;
  }
}
