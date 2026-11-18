class InternalServerError extends Error {
  constructor(msg) {
    super(msg || "Internal Server Error");
    this.statusCode = 500;
  }
}

class BadRequestError extends Error {
  constructor(msg) {
    super(msg || "Bad Request");
    this.statusCode = 400;
  }
}

class NotFoundError extends Error {
  constructor(msg) {
    super(msg || "Item Not Found");
    this.statusCode = 404;
  }
}

class ConflictError extends Error {
  constructor(msg) {
    super(msg || "Conflict");
    this.statusCode = 409;
  }
}

class InvalidAuthError extends Error {
  constructor(msg) {
    super(msg || "Authorization Required");
    this.statusCode = 401;
  }
}

class ForebiddenError extends Error {
  constructor(msg) {
    super(msg || "Forebidden");
    this.statusCode = 403;
  }
}

module.exports = {
  InternalServerError,
  BadRequestError,
  NotFoundError,
  ConflictError,
  InvalidAuthError,
  ForebiddenError,
};
