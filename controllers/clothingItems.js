const item = require("../models/clothingItem");
const {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  FORBIDDEN_ERROR,
} = require("../utils/errors");

function getItems(req, res) {
  item
    .find({})
    .then((cItem) => res.send(cItem))
    .catch(() => next());
}

async function deleteItem(req, res) {
  try {
    const foundItem = await item.findById(req.params.itemId);

    if (!foundItem) {
      throw new NOT_FOUND_ERROR();
    }

    if (foundItem.owner.toString() !== req.user._id) {
      throw new FORBIDDEN_ERROR("Error: Forbidden");
    }

    await foundItem.deleteOne();

    return res.send({ message: "Deletion Successful" });
  } catch (error) {
    if (error.name === "CastError") {
      throw new BAD_REQUEST_ERROR("Invalid data");
    }
    next(error);
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
      if (error.name === "ValidationError") {
        throw new BAD_REQUEST_ERROR("Invalid data");
      }
      next(error);
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
        throw new NOT_FOUND_ERROR(`${updatedItem} not found`);
      }

      return res.send(updatedItem);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        throw new BAD_REQUEST_ERROR("Invalid data");
      }
      next(error);
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
        throw new NOT_FOUND_ERROR(`${updatedItem} not found`);
      }
      return res.send(updatedItem);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        throw new BAD_REQUEST_ERROR("Invalid data");
      }

      next(error);
    });
}

module.exports = { getItems, deleteItem, createItem, likeItem, unlikeItem };
