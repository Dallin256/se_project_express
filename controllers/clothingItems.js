const item = require("../modals/clothingItem");
const { err500, err400, err404 } = require("../utils/errors");

function getItems(req, res) {
  item
    .find({})
    .then((item) => res.send(item))
    .catch((error) => err500(res));
}

function deleteItem(req, res) {
  item
    .findByIdAndDelete(req.params.itemId)
    .then((item) => {
      if (!item) {
        err404(res, "Item");
      }
      res.send({ message: "Deletion Successful" });
    })
    .catch((error) => err500(res));
}

function createItem(req, res) {
  const { name, weather, imageUrl } = req.body;
  item
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      err400(res);
    });
}

function likeItem(req, res) {
  item
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .catch((error) => {
      if (!item) {
        return err404(res, "ERROR! Liked item not found!");
      }
      if (error == "CastError") {
        return err400(res);
      }
      return err500(res);
    });
}

function unlikeItem(req, res) {
  item
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .catch((error) => {
      if (!item) {
        return err404(res, "ERROR! Liked item not found!");
      }
      if (error == "CastError") {
        return err400(res);
      }
      return err500(res);
    });
}

module.exports = { getItems, deleteItem, createItem, likeItem, unlikeItem };
