const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const MainRoutes = require("./routes/index");

const app = express();
const { port = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use(cors());

app.listen(port, () => {});

app.get("/", (req, res) => {
  res.send("Server Running :3");
});

app.use("/", MainRoutes);
