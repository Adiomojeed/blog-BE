const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    maxLength: 250,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  category: {
    type: String,
    enum: ["sport", "entertainment", "tech"],
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
