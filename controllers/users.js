const User = require("../models/user");
const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
} = require("../utils/errors");

function getUsers(req, res) {
  User.find({})
    .then((users) => res.send(users))
    .catch(() =>
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Internal Server Error" })
    );
}

function getUser(req, res) {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: `${user} not found` });
      }
      return res.send(user);
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
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch(() => {
      res.status(BAD_REQUEST).send({ message: "Invalid data" });
    });
}

module.exports = { getUser, getUsers, createUser };
