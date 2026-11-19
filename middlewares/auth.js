const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { InvalidAuthError } = require("../utils/errors");

function authorize(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new InvalidAuthError("Authorization required"));
  }
  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return next(new InvalidAuthError("Authorization required"));
  }
}

module.exports = { authorize };
