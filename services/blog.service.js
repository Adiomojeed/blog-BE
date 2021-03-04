const _ = require("lodash");
const Blog = require("../models/Blog");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Like = require("../models/Like");
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

const getBlog = async (id) => {
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return { error: "Blog with given id not found" };
    } else {
      const comments = await Comment.find({ blog: id })
        .sort("-createdAt")
        .populate("author", "name -_id");
      const likes = await Like.find({ blog: id }).populate("author", "name");
      return {
        data: {
          ...blog._doc,
          comments: _.map(comments, (comment) =>
            _.pick(comment, "author", "comment")
          ),
          likes: _.map(likes, "author"),
        },
      };
    }
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

const updateBlog = async (data, id) => {
  try {
    const { title, description, category, thumbnail } = data;
    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          description,
          category,
          thumbnail,
        },
      },
      { useFindAndModify: false, new: true }
    );
    return { data: blog };
  } catch (error) {
    return { error: error.message };
  }
};

const deleteBlog = async (id) => {
  try {
    const blog = await Blog.findByIdAndDelete(id, { useFindAndModify: false });
    return { data: blog };
  } catch (error) {
    return { error: error.message };
  }
};

const blogComment = async (data, author) => {
  try {
    const blog = await Blog.findById(data.blog);
    if (!blog) {
      return { error: "Blog with given id not found" };
    } else {
      const comment = await Comment.create({ ...data, author });
      return { data: comment };
    }
  } catch (error) {
    return { error: error.message };
  }
};

const blogLike = async (id, author) => {
  try {
    const blog = await Blog.findById(id);
    const liked = await Like.findOne({ blog: id, author });
    if (!blog) {
      return { error: "Blog with given id not found" };
    } else if (liked) {
      const res = await Like.findByIdAndDelete(liked._id, {
        useFindAndModify: false,
      });
      return { data: res, log: "Unliked" };
    } else {
      const like = await Like.create({ blog: id, author });
      return { data: like, log: "Liked" };
    }
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  searchBlog,
  updateBlog,
  deleteBlog,
  blogComment,
  blogLike,
};
