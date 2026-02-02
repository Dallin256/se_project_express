const router = require("express").Router();
const {
  getCurrentUser,
  createUser,
  updateUser,
} = require("../controllers/users");
const { authorize } = require("../middlewares/auth");

router.get("/users/me", authorize, getCurrentUser);
router.post("/users", authorize, createUser);
router.patch("users/me", authorize, updateUser);

module.exports = router;
