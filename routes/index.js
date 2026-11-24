const router = require("express").Router();
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const NotFoundError = require("../utils/errors/NotFoundError");
const {
  validateUserBody,
  validateUserCred,
} = require("../middlewares/validation");

router.use("/users", userRoutes);
router.use("/items", itemRoutes);

router.post("/signin", validateUserCred, login);
router.post("/signup", validateUserBody, createUser);

router.use((req, res, next) => {
  return next(new NotFoundError("Route not found"));
});

module.exports = router;
