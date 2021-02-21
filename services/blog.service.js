const Blog = require("../models/Blog");
const User = require("../models/User");
const { searchRegex } = require("../utils/regex");

const createBlog = async (data) => {
  try {
    const user = await User.findById(data.author);
    if (!user) return { error: `Author with id "${data.author}" not found` };
    else {
      const blog = await Blog.create(data);
      return { data: blog };
    }
  } catch (error) {
    return { error: error.errors.category.properties };
  }
};

const getBlogs = async () => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name")
      .sort("-createdAt");
    return { data: blogs };
  } catch (error) {
    return { error: error.message };
  }
};

const searchBlog = async (data) => {
  try {
    const regexp = new RegExp(searchRegex(data.search), "gi");
    const blogs = await Blog.find({
      $or: [{ title: regexp }, { description: regexp }, { category: regexp }],
    }).sort("-createdAt");
    return { data: blogs };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { createBlog, getBlogs, searchBlog };
