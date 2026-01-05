const express = require("express");
const app = express();
const userRoutes = require("./routes/users");
const itemRoutes = require("./routes/clothingItems");
const { err404 } = require("./utils/errors");
const { port = 3001 } = process.env;
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use((req, res, next) => {
  req.user = { _id: "695a96e6d4d22cdacdf81cda" };
  next();
});

app.get("/", (req, res) => {
  res.send("Server Running :3");
});

app.use("/", userRoutes);
app.use("/", itemRoutes);

app.use((req, res) => {
  err404(res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
