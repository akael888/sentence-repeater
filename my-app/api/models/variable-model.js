const mongoose = require("mongoose");

const VariableSchema = mongoose.Schema({
  order: { type: Number, required: [true, "Please provide Variable Order"] },
  variableName: {
    type: String,
    required: [true, "Please provide Variable Name"],
  },
  variableType: {
    type: String,
    enum: ["integer", "string", "date", "list"],
    required: [true, "Please provide Variable Type"],
  },
  variableOperation: {
    type: String,
    enum: ["iterate", "randomize", "none"],
    required: [true, "Please provide Variable Operation"],
  },
  variableStartValue: mongoose.Schema.Types.Mixed,
  intervalCount: {
    type: Number,
    required: [
      function () {
        return (
          this.variableOperation == "iterate" || this.variableType != "string"
        );
      },
      "Please provide Iteration Count",
    ],
  },
  variableMinValue: mongoose.Schema.Types.Mixed,
  variableMaxValue: mongoose.Schema.Types.Mixed,
  variableList: { type: [String], default: [] },
  usedBySentence: {
    type: mongoose.Types.ObjectId,
    required: [true, "Please provide Sentence ID"],
    ref: "Sentence",
  },
});

VariableSchema.pre("save", function (next) {
  switch (this.variableType) {
    case "integer":
      this.variableStartValue = Number(this.variableStartValue);
      this.variableMinValue = Number(this.variableMinValue);
      this.variableMaxValue = Number(this.variableMaxValue);
      break;
    case "string":
      this.variableStartValue = String(this.variableStartValue);
      break;
    case "date":
      this.variableStartValue = new Date(this.variableStartValue);
      this.variableMinValue = new Date(this.variableMinValue);
      this.variableMaxValue = new Date(this.variableMaxValue);
      break;
    default:
      break;
  }
  next();
});

module.exports = mongoose.model("Variable", VariableSchema);
