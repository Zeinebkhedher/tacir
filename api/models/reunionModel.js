const mongoose = require("mongoose");

const reunionSchema = mongoose.Schema({
  titre: { type: String, required: true },
  date: { type: Date, required: true },
  heureDebut: { type: String, required: true },
  heureFin: { type: String, required: true },
  link: { type: String, required: true },
  destinataires: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Membres", required: true },
  ],
});

module.exports = mongoose.model("Reunion", reunionSchema);
