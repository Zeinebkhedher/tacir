  const { boolean } = require("joi");
  const mongoose = require("mongoose");

  const condidatCreathontacirSchema = new mongoose.Schema(
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
      membres: {
        type: [String],
        required: false,
      },
      status:{
        type: String,
        enum: ["accepté", "refusé"],
      },
      creathon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Creathon',
        required: true,
      },

      confirm: {
        type: Boolean,
        default: false,
      },
    },

    { timestamps: true }
  );

  module.exports = mongoose.model("candidatsCreathon", condidatCreathontacirSchema);
