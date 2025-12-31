const mongoose = require("mongoose");

const user = new mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 30, required: true },
  avatar: { type: URL, required: true },
});
