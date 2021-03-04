const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createBlog = {
  body: {
    title: Joi.string().trim().max(250).required(),
    description: Joi.string().trim().required(),
    category: Joi.string().trim().required(),
    thumbnail: Joi.string()
      .trim()
      .required("Requires a valid thumbnail image url"),
    author: Joi.string().trim().required().custom(objectId),
  },
};

const updateBlog = {
  body: {
    title: Joi.string().trim().max(250).required(),
    description: Joi.string().trim().required(),
    category: Joi.string().trim().required(),
    thumbnail: Joi.string().trim().required(),
  },
  params: {
    blogId: Joi.string().trim().required().custom(objectId),
  },
};

const singleBlog = {
  params: {
    blogId: Joi.string().trim().required().custom(objectId),
  },
};

const searchBlog = {
  query: {
    search: Joi.string().trim(),
  },
};

const blogComment = {
  body: {
    blog: Joi.string().trim().required().custom(objectId),
    comment: Joi.string().trim().required(),
  },
};

const blogLike = {
  body: {
    blog: Joi.string().trim().required().custom(objectId),
  },
};

module.exports = {
  createBlog,
  searchBlog,
  updateBlog,
  singleBlog,
  blogComment,
  blogLike,
};
