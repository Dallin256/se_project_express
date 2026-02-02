const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT_ERROR,
  INVALID_AUTH,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");
const authorize = require("../middlewares/auth");
const { patch } = require("../routes");

function getCurrentUser(req, res) {
  User.findById(req.user._id)
    .then((User) => {
      if (!User) {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      return res.send(User);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Internal Server Error" });
    });
}

function createUser(req, res) {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 13).then((hashedPassword) => {
    return User.create({ name, avatar, email, password: hashedPassword })
      .then((User) => {
        delete User._doc.password;
        return res.send(User);
      })
      .catch((error) => {
        if (error.code == 11000) {
          return res
            .status(CONFLICT_ERROR)
            .send({ message: "email already exists in database" });
        }
        if (error.name === "CastError" || error.name === "ValidationError") {
          return res.status(BAD_REQUEST).send({ message: "Invalid data" });
        }
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "Internal Server Error" });
      });
  });
}

function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(BAD_REQUEST).send({ message: "Invalid data" });
  }

  return User.findUserByCredentials(email, password)
    .then((User) => {
      const token = jwt.sign({ _id: User._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch((error) => {
      if (
        error.name === "ValidationError" ||
        error.message == "Incorrect email or password"
      ) {
        return res
          .status(INVALID_AUTH)
          .send({ message: "Authorization required" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Internal Server Error" });
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
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      return res.send(user);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      if (error.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Internal Server Error" });
    });
}

module.exports = { getCurrentUser, createUser, login, updateUser };
