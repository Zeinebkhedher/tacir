const mongoose = require("mongoose");

const mentoratSchema = mongoose.Schema({
  titre: { type: String, required: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  description: { type: String, required: true },
  destinataires: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Membres", required: true },
  ],
  mentors: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Membres", required: true },
  ],
  region: {
    type: String,
    enum: ["KEF", "TUNIS"], // Adding enum values
    required: true, // Making the field required
  },
});

const Mentorat = mongoose.model("Mentorat", mentoratSchema);

module.exports = Mentorat;
