const mongoose = require("mongoose");
const membreTacirSchema = mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  sexe: { type: String, enum: ["Homme", "Femme"] },
  dateNaissance: { type: String },
  nationalite: { type: String },
  CIN: { type: String },
  situationPerso: { type: String },
  telephone: { type: String },
  region: { type: String, enum: ["Tunis", "Kef"] },
  historiqueStatut: {
    type: String,
  },
  role: {
    type: String,
    enum: [
      "admin",
      "Mentor",
      "PorteurProjet",
      "coordinateurGeneral",
      "coordinateurRegional",
      "candidat",
      "beneficiaraie"
    ],
    required: true,
  },
});
module.exports = mongoose.model("Membres", membreTacirSchema);
