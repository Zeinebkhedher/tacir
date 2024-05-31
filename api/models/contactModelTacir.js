const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  email: { type: String, required: true },
  role: {
    type: String,
    enum: [
      "PorteurProjet",
      "Mentor",
      "coordinateurGeneral",
      "coordinateurRegional",
      "admin",
    ],
    required: true,
  },
  message: { type: String }, // Adding message field to the schema
});

module.exports = mongoose.model("Contact", contactSchema);
