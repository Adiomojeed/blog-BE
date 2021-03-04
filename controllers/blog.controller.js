const blogService = require("../services/blog.service");
const responseHandler = require("../utils/responseHandler");

const createBlog = async (req, res) => {
  const blog = await blogService.createBlog(req.body);
  if (blog.error) responseHandler(res, blog.error, 400);
  else responseHandler(res, "Blog Created Successfully", 200, blog.data, true);
};

const getBlogs = async (req, res) => {
  const blogs = await blogService.getBlogs();
  if (blogs.error) responseHandler(res, blogs.error, 500);
  else
    responseHandler(res, "Blogs Fetched Successfully", 200, blogs.data, true);
};

const getBlog = async (req, res) => {
  const blog = await blogService.getBlog(req.params.blogId);
  if (blog.error) responseHandler(res, blog.error, 400);
  else responseHandler(res, "Blog Fetched Successfully", 200, blog.data, true);
};

const searchBlog = async (req, res) => {
  const blogs = await blogService.searchBlog(req.query);
  if (blogs.error) responseHandler(res, blogs.error, 500);
  else
    responseHandler(res, "Blogs Fetched Successfully", 200, blogs.data, true);
};

const updateBlog = async (req, res) => {
  const blog = await blogService.updateBlog(req.body, req.params.blogId);
  if (blog.error) responseHandler(res, blog.error, 400);
  else responseHandler(res, "Blog Updated Successfully", 200, blog.data, true);
};

const deleteBlog = async (req, res) => {
  const blog = await blogService.deleteBlog(req.params.blogId);
  if (blog.error) responseHandler(res, blog.error, 400);
  else responseHandler(res, "Blog Deleted Successfully", 200, blog.data, true);
};

const blogComment = async (req, res) => {
  const comment = await blogService.blogComment(req.body, req.user._id);
  if (comment.error) responseHandler(res, comment.error, 400);
  else
    responseHandler(
      res,
      "Comment Created Successfully",
      200,
      comment.data,
      true
    );
};

const blogLike = async (req, res) => {
  const like = await blogService.blogLike(req.body.blog, req.user._id);
  if (like.error) responseHandler(res, like.error, 400);
  else responseHandler(res, like.log, 200, like.data, true);
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
