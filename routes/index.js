const router = require("express").Router();
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const express = require("express");
const app = express();

router.use("/users", userRoutes);
router.use("/items", itemRoutes);

app.post("/signin", login);
app.post("/signup", createUser);

module.exports = router;
