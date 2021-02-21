module.exports = (
  res,
  message,
  statusCode = 501,
  data = {},
  success = false,
  header
) => {
  if (header)
    return res
      .header("x-auth-token", header)
      .status(statusCode)
      .send({ success, message, data });
  else return res.status(statusCode).send({ success, message, data });
};
