const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR,
  INVALID_AUTH_ERROR,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

function getCurrentUser(req, res) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NOT_FOUND_ERROR("User not found");
      }
      return res.send(user);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        throw new BAD_REQUEST_ERROR("Invalid data");
      }
      next(error);
    });
}

function createUser(req, res) {
  const { name, avatar, email, password } = req.body;
  if (!email || !password) {
    throw new BAD_REQUEST_ERROR("Invalid data");
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
          throw new CONFLICT_ERROR("email already exists in database");
        }
        if (error.name === "ValidationError") {
          throw new BAD_REQUEST_ERROR("Invalid data");
        }
        next(error);
      });
  });
}

function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BAD_REQUEST_ERROR("Invalid data");
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
        throw new INVALID_AUTH_ERROR("Authorization required");
      }
      next(error);
    });
}

function updateUser(req, res) {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NOT_FOUND_ERROR("User not found");
      }
      return res.send(user);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        throw new BAD_REQUEST_ERROR("Invalid data");
      }
      if (error.name === "ValidationError") {
        throw new INVALID_AUTH_ERROR("Authorization required");
      }
      next(error);
    });
}

module.exports = { getCurrentUser, createUser, login, updateUser };
