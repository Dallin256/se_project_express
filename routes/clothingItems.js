const router = require("express").Router();
const {
  getItems,
  deleteItem,
  createItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");
const { authorize } = require("../middlewares/auth");
const { validateCardBody } = require("../middlewares/validation");

router.get("/", getItems);
router.post("/", validateCardBody, authorize, createItem);

router.delete("/:itemId", validateCardBody, authorize, deleteItem);

router.put("/:itemId/likes", validateCardBody, authorize, likeItem);
router.delete("/:itemId/likes", validateCardBody, authorize, unlikeItem);

module.exports = router;
