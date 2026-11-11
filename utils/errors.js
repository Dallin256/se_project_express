class INTERNAL_SERVER_ERROR extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = 500;
  }
}

class BAD_REQUEST_ERROR extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = 400;
  }
}

class NOT_FOUND_ERROR extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = 404;
  }
}

class CONFLICT_ERROR extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = 409;
  }
}

class INVALID_AUTH_ERROR extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = 401;
  }
}

class FORBIDDEN_ERROR extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = 403;
  }
}

module.exports = {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR,
  INVALID_AUTH_ERROR,
  FORBIDDEN_ERROR,
};
