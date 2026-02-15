const item = require("../models/clothingItem");
const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
  FORBIDDEN,
} = require("../utils/errors");

function getItems(req, res) {
  item
    .find({})
    .then((cItem) => res.send(cItem))
    .catch(() =>
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Internal Server Error" })
    );
}

async function deleteItem(req, res) {
  try {
    const foundItem = await item.findById(req.params.itemId);

    if (!foundItem) {
      return res.status(NOT_FOUND).send({ message: "item not found" });
    }

    if (foundItem.owner.toString() != req.user._id) {
      return res.status(FORBIDDEN).send({ message: "forbidden" });
    }

    await foundItem.deleteOne();

    return res.send({ message: "Deletion Successful" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(BAD_REQUEST).send({ message: "Invalid data" });
    }

    return res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: "Internal Server Error" });
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
      if (error.name === "ValidationError" || error.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Internal Server Error" });
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
        return res
          .status(NOT_FOUND)
          .send({ message: `${updatedItem} not found` });
      }
      return res.send(updatedItem);
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

function unlikeItem(req, res) {
  item
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .then((updatedItem) => {
      if (!updatedItem) {
        return res
          .status(NOT_FOUND)
          .send({ message: `${updatedItem} not found` });
      }
      return res.send(updatedItem);
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

module.exports = { getItems, deleteItem, createItem, likeItem, unlikeItem };
