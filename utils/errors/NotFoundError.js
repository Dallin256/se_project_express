export class NotFoundError extends Error {
  constructor(msg) {
    super(msg || "Item Not Found");
    this.statusCode = 404;
  }
}
