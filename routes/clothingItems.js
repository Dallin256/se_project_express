const router = require("express").Router();
const {
  getItems,
  deleteItem,
  createItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");
const { authorize } = require("../middlewares/auth");

router.get("/", getItems);
router.post("/", authorize, createItem);

router.delete("/:itemId", authorize, deleteItem);

router.put("/:itemId/likes", authorize, likeItem);
router.delete("/:itemId/likes", authorize, unlikeItem);

module.exports = router;
