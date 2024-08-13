const mongoose = require("mongoose");

const outputSchema = new mongoose.Schema({
  file: {
    type: String,
    required: true
  },
  dateDepot: {
    type: Date,
    required: true
  },
  creathonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Creathon',
    required: true
  },
  porteurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Membres',
    required: true
  },
  commentaires: [
    {
      coordonateurId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Membres',
        required: true
      },
      texte: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model("Output", outputSchema);
