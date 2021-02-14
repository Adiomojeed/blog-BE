const express = require("express");
const router = express.Router();
const userSeeder = require("../database/seeders/userSeeder");
const userValidation = require("../validations/user.validation");
const validation = require("../middlewares/validate");
const userController = require("../controllers/user.controller");

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

module.exports = router;
