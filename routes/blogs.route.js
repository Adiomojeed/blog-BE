const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.controller");
const validation = require("../middlewares/validate");
const blogValidation = require("../validations/blog.validation");
const { auth, isBlog } = require("../middlewares/auth");

router
  .route("/")
  .get(blogController.getBlogs)
  .post(auth, validation(blogValidation.createBlog), blogController.createBlog);

router.patch(
  "/:blogId",
  validation(blogValidation.updateBlog),
  auth,
  isBlog,
  blogController.updateBlog
);

router.get(
  "/search",
  validation(blogValidation.searchBlog),
  blogController.searchBlog
);

module.exports = router;
