const express = require("express");
const mongoose = require("mongoose");
const MainRoutes = require("./routes/index");
const { NOT_FOUND } = require("./utils/errors");

const app = express();
const { port = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use((req, res, next) => {
  req.user = { _id: "695a96e6d4d22cdacdf81cda" };
  next();
});

app.get("/", (req, res) => {
  res.send("Server Running :3");
});

app.use("/", MainRoutes);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Request not found" });
});

app.listen(port, () => {});
