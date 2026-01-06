const router = require("express").Router();
const userRoutes = require("./routes/users");
const itemRoutes = require("./routes/clothingItems");

router.use("/users", userRoutes);
router.use("/items", itemRoutes);

module.exports = router;
