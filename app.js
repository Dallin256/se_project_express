const express = require("express");
const app = express();
const userRoutes = require("./routes/users");
const itemRoutes = require("./routes/clothingItems");
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
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
