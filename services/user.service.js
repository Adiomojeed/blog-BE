const bcrypt = require("bcrypt");
const User = require("../models/User");
const _ = require("lodash");

const createUser = async (data) => {
  try {
    const { password, email } = data;
    let user = await User.isEmailTaken(email);
    if (user) return { error: "User already exists" };
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    user = await User.create({ ...data, password: hashed });
    const token = user.generateToken();
    return {
      data: _.pick(user, ["_id", "name", "email", "isAdmin", "createdAt"]),
      token,
    };
  } catch (error) {
    return { error: error.message };
  }
};

const loginUser = async (data) => {
  try {
    const { email, password } = data;
    const user = await User.isEmailTaken(email);
    if (!user) return { error: "User with this email not found" };
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return { error: "Invalid Password" };
    const token = user.generateToken();
    return {
      data: _.pick(user, ["_id", "name", "email", "isAdmin"]),
      token,
    };
  } catch (error) {
    return { error: error.message };
  }
};

const me = async (data) => {
  try {
    const user = await User.findById(data._id);
    if (!user) {
      return { error: "Invalid token" };
    }
    return {
      data: _.pick(user, ["_id", "name", "email", "isAdmin"]),
    };
  } catch (err) {
    return { error: error.message };
  }
};

module.exports = { createUser, loginUser, me };
