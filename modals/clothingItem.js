const mongoose = require("mongoose");

const clothingItem = new mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 30, required: true },
  weather: { type: String, required: true },
  imageUrl: { type: URL, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: user },
  likes: [{ type: mongoose.Schema.Types.ObjectId }],
  createdAt: { type: Date, default: Date.now },
});
