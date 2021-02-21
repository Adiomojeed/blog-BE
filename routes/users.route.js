const express = require("express");
const router = express.Router();
const userValidation = require("../validations/user.validation");
const validation = require("../middlewares/validate");
const userController = require("../controllers/user.controller");
const {auth} = require("../middlewares/auth");

router.post(
  "/register",
  validation(userValidation.createUser),
  userController.createUser
);

router.post(
  "/login",
  validation(userValidation.loginUser),
  userController.loginUser
);

router.get("/me", auth, userController.me);

module.exports = router;
