const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateToken = function () {
  return jwt.sign(
    _.pick(this, ["_id", "name", "password", "isAdmin", "createdAt"]),
    process.env.JWT_KEY
  );
};

userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email });
  return user
};

module.exports = mongoose.model("User", userSchema);
