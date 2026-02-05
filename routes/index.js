const router = require("express").Router();
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const express = require("express");

router.use("/users", userRoutes);
router.use("/items", itemRoutes);

router.post("/signin", login);
router.post("/signup", createUser);

module.exports = router;
