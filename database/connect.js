const mongoose = require("mongoose");
const debug = require("debug")("app:db");

module.exports = (dbUrl) => {
  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => debug("App connected to database"))
    .catch(() => debug("Something went wrong, try again"));
};
