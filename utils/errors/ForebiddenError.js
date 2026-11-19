export class ForebiddenError extends Error {
  constructor(msg) {
    super(msg || "Forebidden");
    this.statusCode = 403;
  }
}
