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

const me = async (req, res) => {
  const user = await userService.me(req.user);
  if (user.error) responseHandler(res, user.error, 400);
  else responseHandler(res, "Success", 200, user.data, true);
};

module.exports = { createUser, loginUser, me };
