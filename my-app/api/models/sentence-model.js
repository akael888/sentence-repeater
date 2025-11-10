const mongoose = require("mongoose");

const SentenceSchema = new mongoose.Schema(
  {
    sentence: {
      type: String,
      required: [true, "Missing sentence"],
    },
    sentenceName: {
      type: String,
      required: [true, "Missing Sentence Name"],
      minlength: 3,
      maxlength: 15,
    },
    sentenceDescription: {
      type: String,
      required: [true, "Missing Sentence Description"],
      minlength: 3,
      maxlength: 100,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sentence", SentenceSchema);
