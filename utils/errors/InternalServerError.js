export default class InternalServerError extends Error {
  constructor(msg) {
    super(msg || "Internal Server Error");
    this.statusCode = 500;
  }
}
