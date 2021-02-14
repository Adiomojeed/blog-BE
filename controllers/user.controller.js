const userService = require("../services/user.service");
const responseHandler = require("../utils/responseHandler");

const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  if (user.error) responseHandler(res, user.error, 400);
  else
    responseHandler(
      res,
      "Successfully Registered",
      200,
      user.data,
      true,
      user.token
    );
};

const loginUser = async (req, res) => {
  const user = await userService.loginUser(req.body);
  if (user.error) responseHandler(res, user.error, 400);
  else
    responseHandler(
      res,
      "Successfully logged in",
      200,
      user.data,
      true,
      user.token
    );
};

module.exports = { createUser, loginUser };
