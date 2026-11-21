const item = require("../models/clothingItem");

const { BadRequestError } = require("../utils/errors/BadRequestError");
const { NotFoundError } = require("../utils/errors/NotFoundError");
const { ForebiddenError } = require("../utils/errors/ForebiddenError");
const { InternalServerError } = require("../utils/errors/InternalServerError");

function getItems(req, res, next) {
  item
    .find({})
    .then((cItem) => res.send(cItem))
    .catch(() => next(new InternalServerError()));
}

async function deleteItem(req, res, next) {
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

function createItem(req, res, next) {
  const { name, weather, imageUrl } = req.body;
  item
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((cItem) => {
      res.send(cItem);
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        return next(new BadRequestError("Invalid Data"));
      }
      return next(new InternalServerError());
    });
}

function likeItem(req, res, next) {
  item
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .then((updatedItem) => {
      if (!updatedItem) {
        return next(new InternalServerError());
      }

      return res.send(updatedItem);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        return next(new BadRequestError("Invalid Data"));
      }
      return next(new InternalServerError());
    });
}

function unlikeItem(req, res, next) {
  item
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .then((updatedItem) => {
      if (!updatedItem) {
        return next(new NotFoundError(`${updatedItem} not found`));
      }
      return res.send(updatedItem);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        return next(new BadRequestError("Invalid Data"));
      }
      return next(new InternalServerError());
    });
}

module.exports = { getItems, deleteItem, createItem, likeItem, unlikeItem };
