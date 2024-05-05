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
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Membres" }],
});

module.exports = mongoose.model("formation", formationSchema);
