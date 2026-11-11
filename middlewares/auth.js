const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { INVALID_AUTH_ERROR } = require("../utils/errors");

function authorize(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new INVALID_AUTH_ERROR("Authorization required");
  }
  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { authorize };
