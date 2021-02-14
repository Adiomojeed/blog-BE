const Joi = require("joi");

// const createUser = (data) => {
//   const schema = Joi.object({
//     name: Joi.string().min(5).required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().min(6).required(),
//   });
//   return schema.validate(data, { abortEarly: false });
// };

const createUser = {
  body: Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
};

const loginUser = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
};

module.exports = { createUser, loginUser };
