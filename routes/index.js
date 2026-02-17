const router = require("express").Router();
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const { NOT_FOUND } = require("../utils/errors");

router.use("/users", userRoutes);
router.use("/items", itemRoutes);

router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Request not found" });
});

module.exports = router;
