module.exports = (
  res,
  message,
  code = 501,
  data = {},
  success = false,
  header
) => {
  if (header)
    return res
      .header("x-auth-token", header)
      .status(code)
      .send({ success, message, data });
  else return res.status(code).send({ success, message, data });
};
