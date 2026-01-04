const router = require("express").Router();
const {
  getItems,
  deleteItem,
  createItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

router.get("/items", getItems);
router.post("/items", createItem);

router.delete("/items/:itemId", deleteItem);

router.put("/items/:itemId/likes", likeItem);
router.delete("/items/:itemId/likes", unlikeItem);

module.exports = router;
