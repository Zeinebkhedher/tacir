const mongoose = require("mongoose");

const membreTacirSchema = mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true/*, unique: true*/ },
  CIN: { type: String },
  telephone: { type: String },
  sexe: { type: String, enum: ["Homme", "Femme"] },
  region: { type: String, enum: ["Tunis", "Kef"] },
  dateNaissance: { type: String },
  situationPerso: { type: String },
  password: { type: String},
  /*nationalite: { type: String },*/
  historiqueStatut: { type: String },
  role: {
    type: String,
    enum: [
      "admin",
      "Mentor",
      "PorteurProjet",
      "coordinateurGeneral",
      "coordinateurRegional",
      "candidat",
      "coordinateurComposante",
      "beneficiaireFormation",
    ],
   
  },
  titre: { type: String },
  descriptif: { type: String },
  ideeProjet: { type: String },
  lien: { type: String },
  porteur: { type: String },
  membres: { type: [String] },
  aventure: { type: String },
  motivation: { type: String },
  status: {
    type: String,
    enum: ['en attente', 'accepté', 'rejeté'], 
    default: 'en attente'
  },
  confirm: { type: Boolean, default: false },
});

module.exports = mongoose.model("Membres", membreTacirSchema);
