const { handleError } = require("../middlewares/error");
const item = require("../models/clothingItem");
const {
  BadRequestError,
  NotFoundError,
  ForebiddenError,
  InternalServerError,
} = require("../utils/errors");

function getItems(req, res, next) {
  item
    .find({})
    .then((cItem) => res.send(cItem))
    .catch((err) => next(new InternalServerError()));
}

async function deleteItem(req, res) {
  try {
    const foundItem = await item.findById(req.params.itemId);

    if (!foundItem) {
      return next(new NotFoundError());
    }

    if (foundItem.owner.toString() !== req.user._id) {
      return next(new ForebiddenError("Error: Forbidden"));
    }

    await foundItem.deleteOne();

    return res.send({ message: "Deletion Successful" });
  } catch (error) {
    if (error.name === "CastError") {
      return next(new BadRequestError("Invalid data"));
    }
    return next(new InternalServerError());
  }
}

function createItem(req, res) {
  const { name, weather, imageUrl } = req.body;
  item
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((cItem) => {
      res.send(cItem);
    })
    .catch((error) => {
      next(new error());
    });
}

function likeItem(req, res) {
  item
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .then((updatedItem) => {
      if (!updatedItem) {
        next(new error());
      }

      return res.send(updatedItem);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        throw new BadRequestError("Invalid data");
      }
      next(new error());
    });
}

function unlikeItem(req, res) {
  item
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .then((updatedItem) => {
      if (!updatedItem) {
        next(new error());
      }
      return res.send(updatedItem);
    })
    .catch((error) => {
      next(new error());
    });
}

module.exports = { getItems, deleteItem, createItem, likeItem, unlikeItem };
