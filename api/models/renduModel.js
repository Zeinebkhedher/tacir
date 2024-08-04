const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const renduSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    files: [fileSchema],
    expirationDate: {
      type: Date,
      required: true,
    },
    commentaire: {
      type: String,
    },
    destinataires: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Membres", required: true },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rendu", renduSchema);
