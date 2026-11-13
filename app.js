require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const MainRoutes = require("./routes/index");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { port = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use(cors());

app.use(requestLogger);

app.get("/", (req, res) => {
  res.send("Server Running :3");
});

app.use("/", MainRoutes);
app.use(errorLogger);

app.use((err, req, res, next) => {
  console.error(err);
  return res.status(err.statusCode).send({ message: err.msg });
});

app.listen(port, () => {});
