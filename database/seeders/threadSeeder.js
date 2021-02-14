const mongoose = require("mongoose");
const Thread = require("../../models/Thread");

const createThread = async (data) => {
  try {
    const thread = await Thread.create(data);
    return { data: thread };
  } catch (error) {
    return { error: error.message };
  }
};

const getThreads = async () => {
  try {
    const threads = await Thread.find().populate("author", "name");
    return { data: threads };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { createThread, getThreads };
