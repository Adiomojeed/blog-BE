const _ = require("lodash");
const Joi = require("joi");

module.exports = (schema) => (req, res, next) => {
  const validSchema = _.pick(schema, ["body", "params", "query"]);
  const object = _.pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" } })
    .validate(object, {
      abortEarly: false,
    });
  if (error) {
    return res.status(400).send(error.details.map((i) => i.message));
  }
  //   req = value;
  next();
};
