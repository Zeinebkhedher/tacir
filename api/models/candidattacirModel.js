const { boolean } = require("joi");
const mongoose = require("mongoose");

const condidattacirSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    CIN: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },

    sexe: {
      type: String,
      enum: ["Homme", "Femme"],
      required: true,
    },

    region: {
      type: String,
      enum: ["Tunis", "Kef"],
    },

    nationalite: {
      type: String,
      required: true,
    },
    dateNaissance: {
      type: String,
      required: true,
    },

    situationPerso: {
      type: String,
      required: true,
    },
    titre: {
      type: String,
      required: true,
    },
    descriptif: {
      type: String,
      required: true,
    },
    ideeProjet: {
      type: String,
      required: true,
    },
    lien: {
      type: String,
      required: true,
    },
    porteur: {
      type: String,
      required: true,
    },
    membres: {
      type: [String],
      required: false,
    },
    aventure: {
      type: String,
      required: true,
    },
    motivation: {
      type: String,
      required: true,
    },

    confirm: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("candidats", condidattacirSchema);
