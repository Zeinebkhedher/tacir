const mongoose = require("mongoose");

const projetSchema = new mongoose.Schema(
  {
    candidats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "candidat",
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
      enum: ["Tunis", "Kef"],
    },
    booked: {
      type: Boolean,
      default: false,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    candidatsInfo: [
      {
        extraitChante: {
          type: String,
          default: false,
        },

        decision: {
          type: String,
          enum: ["Retenu", "Refusé", "En attente"],
        },
        remarque: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("projet", projetSchema);
