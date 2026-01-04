const mongoose = require("mongoose");
const validator = require("validator");

const itemSchema = new mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 30, required: true },
  weather: { type: String, required: true, enum: ["hot", "warm", "cold"] },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
  likes: [],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("clothingItem", itemSchema);
