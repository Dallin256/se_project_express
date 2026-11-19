export class ConflictError extends Error {
  constructor(msg) {
    super(msg || "Conflict");
    this.statusCode = 409;
  }
}
