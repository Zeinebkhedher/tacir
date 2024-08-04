const mongoose = require("mongoose");

const formationSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  formateur: [
    {
      FirstName: {
        type: String,
        required: true,
      },
      LastName: {
        type: String,
        required: true,
      },
      informations: {
        type: String,
        required: true,
      },
    },
  ],
  Date: {
    type: Date,
    required: true,
  },
  description: { type: String, required: true },
  startHour: { type: String, required: true },
  FinishHour: { type: String, required: true },
  status: {
    type: String,
    enum: ["Upcoming", "Past"],
    default: "Upcoming",
  },
  region: {
    type: String,
    enum: ["TUNIS", "KEF"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  participants: [{ Name: { type: String }, email: { type: String } }],
  beneficiaire: [
    {
      nom: { type: String, required: true },
      prenom: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      numTel: { type: String, required: true },
      motivation: { type: String, required: true },
      adressePostale: { type: String, required: true },
      status: { type: String, enum: ["accepted", "pending", "rejected"], required: true }, // Add status field

    },
  ],
});

module.exports = mongoose.model("formation", formationSchema);
