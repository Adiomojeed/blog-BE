const express = require("express");
const router = express.Router();
const threadSeeder = require("../database/seeders/threadSeeder");
const validate = require("../validations/thread.validation");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

router.get("/", async (req, res) => {
  const threads = await threadSeeder.getThreads();
  if (threads.error) res.status(400).send(threads.error);
  res.send(threads.data);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details);
  const thread = await threadSeeder.createThread(value);
  if (thread.error) res.status(400).send(thread.error);
  res.send(thread.data);
});

module.exports = router;
