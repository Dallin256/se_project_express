const router = require("express").Router();
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const { NotFoundError } = require("../utils/errors");
const { validateUserBody } = require("../middlewares/validation");
const handleError = require("../middlewares/error");

router.use("/users", userRoutes);
router.use("/items", itemRoutes);

router.post("/signin", validateUserBody, login);
router.post("/signup", validateUserBody, createUser);

router.use((req, res) => {
  res.status(NotFoundError).next(handleError);
});

module.exports = router;
