require("dotenv/config");
const express = require("express");
const debug = require("debug")("app:startup");
const dbConnect = require("./database/connect");
const ApiError = require("./utils/ApiError");
const app = express();

const users = require("./routes/users");
const threads = require("./routes/threads");

app.use(express.json());
app.use("/api/auth", users);
app.use("/api/threads", threads);
app.use((err, req, res, next) => {
  res.status(404).send("Not Found");
  //   console.log(err)
  //   next(new ApiError(404, "Not found"));
});

const port = process.env.NODE_ENV_PORT || 3000;

dbConnect(process.env.DB_URL);
app.listen(port, () => debug(`App listening on port ${port}`));
