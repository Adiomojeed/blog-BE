const Joi = require("joi");
const { objectId } = require("./custom.validation");

module.exports = (data) => {
  const schema = Joi.object({
    title: Joi.string().max(250).trim().required(),
    description: Joi.string().trim().required(),
    author: Joi.string().required().custom(objectId),
  });
  return schema.validate(data);
};
