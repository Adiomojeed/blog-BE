const blogService = require("../services/blog.service");
const responseHandler = require("../utils/responseHandler");

const createBlog = async (req, res) => {
  const blog = await blogService.createBlog(req.body);
  if (blog.error) responseHandler(res, blog.error, 400);
  else responseHandler(res, "Blog Created", 200, blog.data, true);
};

const getBlogs = async (req, res) => {
  const blogs = await blogService.getBlogs();
  if (blogs.error) responseHandler(res, blogs.error, 500);
  else responseHandler(res, "Blogs Fetched", 200, blogs.data, true);
};

const searchBlog = async (req, res) => {
  const blogs = await blogService.searchBlog(req.query);
  if (blogs.error) responseHandler(res, blogs.error, 500);
  else responseHandler(res, "Blogs Fetched", 200, blogs.data, true);
};

const updateBlog = async(req, res) => {

}

module.exports = { createBlog, getBlogs, searchBlog, updateBlog };
