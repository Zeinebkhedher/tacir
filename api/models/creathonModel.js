const mongoose = require("mongoose");

const { Schema } = mongoose;

const creathonSchema = new Schema({
  titre: {
    type: String,
    required: true,
  },
  date: {
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
 
  QrCode: {
    type: String,
    default: "",
  },
});


const Creathon = mongoose.model("Creathon", creathonSchema);

module.exports = Creathon;
