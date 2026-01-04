const User = require("../modals/user");
const { err500, err400, err404 } = require("../utils/errors");

function getUsers(req, res) {
  User.find({})
    .then((users) => res.send(users))
    .catch((error) => err500(res));
}

function getUser(req, res) {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return err404(res, "User");
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name == "CastError") {
        return err400(res);
      }
      return err500(res);
    });
}

function createUser(req, res) {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      err400(res);
    });
}

module.exports = { getUser, getUsers, createUser };
