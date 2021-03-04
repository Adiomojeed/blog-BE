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

router
  .route("/:blogId")
  .get(validation(blogValidation.singleBlog), blogController.getBlog)
  .patch(
    validation(blogValidation.updateBlog),
    auth,
    isBlog,
    blogController.updateBlog
  )
  .delete(
    validation(blogValidation.singleBlog),
    auth,
    isBlog,
    blogController.deleteBlog
  );

router.get(
  "/search",
  validation(blogValidation.searchBlog),
  auth,
  blogController.searchBlog
);

router.post(
  "/comment",
  validation(blogValidation.blogComment),
  auth,
  blogController.blogComment
);

router.post(
  "/like",
  validation(blogValidation.blogLike),
  auth,
  blogController.blogLike
);

module.exports = router;
