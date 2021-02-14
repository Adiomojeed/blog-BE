const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.user.isAdmin) return next();

  res.status(403).send("Not an admin");
};
