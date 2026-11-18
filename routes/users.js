const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const { authorize } = require("../middlewares/auth");
const { validateUserBody } = require("../middlewares/validation");

router.get("/me", validateUserBody, authorize, getCurrentUser);
router.patch("/me", validateUserBody, authorize, updateUser);

module.exports = router;
