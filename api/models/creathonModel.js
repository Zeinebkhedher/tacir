const mongoose = require("mongoose");

const { Schema } = mongoose;

const creathonSchema = new Schema({
  titre: {
    type: String,
    required: true,
  },
  dateDebut: {
    type: Date,
    required: true,
  },
  dateFin: {
    type: Date,
    required: true,
  },
  lieu: {
    type: String,
    required: true,
  },
  affiche: {
    type: String,
  },
  status: {
    type: String,
    enum: ["en cours", "fini"],
    default: "en cours",
  },
}, { timestamps: true });  

const Creathon = mongoose.model("Creathon", creathonSchema);

module.exports = Creathon;
