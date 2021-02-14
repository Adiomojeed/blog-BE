const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 250,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
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

module.exports = mongoose.model("Thread", threadSchema);
