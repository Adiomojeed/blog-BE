const jwt = require("jsonwebtoken");
const Blog = require("../models/Blog");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Unauthorized user");
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).send("Invalid token");
  }
};

const isBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) {
      return res.status(400).send("Blog doesn't exist");
    }
    if (blog && blog.author == req.user._id) {
      next();
    } else return res.status(403).send("Blog doesn't belong to you");
  } catch (error) {
    return res.status(403).send("Blog doesn't belong to you");
  }
};

module.exports = { auth, isBlog };
