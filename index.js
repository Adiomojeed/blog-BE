require("dotenv/config");
const express = require("express");
const debug = require("debug")("app:startup");
const dbConnect = require("./database/connect");
const ApiError = require("./utils/ApiError");
const responseHandler = require("./utils/responseHandler");
const app = express();

const users = require("./routes/users.route");
const blogs = require("./routes/blogs.route");

// Routes middlewares
app.use(express.json());
app.use("/api/auth", users);
app.use("/api/blog", blogs);

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send("Something broke!");
});

// Handles 404 routes
app.use(function (req, res, next) {
  responseHandler(res, `Cannot ${req.method} ${req.path}`, 404);
});

const port = process.env.NODE_ENV_PORT || 3000;

dbConnect(
  process.env.NODE_ENV === "development"
    ? process.env.DB_URL_DEV
    : process.env.DB_URL_PROD
);

app.listen(port, () => debug(`App listening on port ${port}`));
