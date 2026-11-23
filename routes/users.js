const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const { authorize } = require("../middlewares/auth");
const { validateUserContent } = require("../middlewares/validation");

router.get("/me", authorize, getCurrentUser);
router.patch("/me", validateUserContent, authorize, updateUser);

module.exports = router;
