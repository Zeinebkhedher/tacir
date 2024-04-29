const mongoose = require("mongoose");

const projetSchema = new mongoose.Schema(
  {
    members: [
      {
        FullName: { type: String, required: true },
        age: { type: Number, required: true },
      },
    ],
    Dateprojet: {
      type: Date,
      required: true,
    },
    titre: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      enum: ["TUNIS", "KEF"],
    },
    comments: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("projet", projetSchema);
