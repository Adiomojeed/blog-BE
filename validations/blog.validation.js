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
    title: Joi.string().trim().max(250),
    description: Joi.string().trim(),
    category: Joi.string().trim(),
    thumbnail: Joi.string().trim(),
  },
  params: {
    blogId: Joi.string().trim().required().custom(objectId),
  },
};

const searchBlog = {
  query: {
    search: Joi.string().trim(),
  },
};

module.exports = { createBlog, searchBlog, updateBlog };
