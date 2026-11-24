const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const BadRequestError = require("../utils/errors/BadRequestError");
const NotFoundError = require("../utils/errors/NotFoundError");
const InternalServerError = require("../utils/errors/InternalServerError");
const ConflictError = require("../utils/errors/ConflictError");
const InvalidAuthError = require("../utils/errors/InvalidAuthError");

const { JWT_SECRET } = require("../utils/config");

function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError("User not found"));
      }
      return res.send(user);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        return next(new BadRequestError("Invalid data"));
      }
      return next(new InternalServerError());
    });
}

function createUser(req, res, next) {
  const { name, avatar, email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("Invalid data"));
  }

  bcrypt.hash(password, 13).then((hashedPassword) => {
    return User.create({ name, avatar, email, password: hashedPassword })
      .then((user) => {
        const userObject = user.toObject();
        delete userObject.password;
        return res.status(201).send(userObject);
      })
      .catch((error) => {
        if (error.code === 11000) {
          return next(new ConflictError("email already exists in database"));
        }
        if (error.name === "ValidationError") {
          return next(new BadRequestError("Invalid data"));
        }
        return next(new InternalServerError());
      });
  });
}

function login(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Invalid data"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch((error) => {
      if (error.message === "Incorrect email or password") {
        return next(new InvalidAuthError("Authorization required"));
      }
      return next(new InternalServerError());
    });
}

function updateUser(req, res, next) {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError("User not found"));
      }
      return res.send(user);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        return next(new BadRequestError("Invalid data"));
      }
      if (error.name === "ValidationError") {
        return next(new InvalidAuthError("Authorization required"));
      }
      return next(new InternalServerError());
    });
}

module.exports = { getCurrentUser, createUser, login, updateUser };
