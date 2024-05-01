// models/EvaluateProject.js

const mongoose = require("mongoose");

const evaluateProjectSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "projet", // Assuming the project model is named "projet"
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  evaluatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Membres",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("evaluateProject", evaluateProjectSchema);
