const router = require("express").Router();
const {
  getItems,
  deleteItem,
  createItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");
const { authorize } = require("../middlewares/auth");
const {
  validateCardBody,
  validateItemId,
} = require("../middlewares/validation");

router.get("/", getItems);
router.post("/", validateCardBody, authorize, createItem);

router.delete("/:itemId", validateItemId, authorize, deleteItem);

router.put("/:itemId/likes", validateItemId, authorize, likeItem);
router.delete("/:itemId/likes", validateItemId, authorize, unlikeItem);

module.exports = router;
