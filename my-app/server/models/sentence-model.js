const mongoose = require("mongoose");

const SentenceSchema = new mongoose.Schema({
  sentence: { type: String, required: [true, "Missing sentence!"] },
});
