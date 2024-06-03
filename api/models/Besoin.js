// models/Besoin.js

const mongoose = require('mongoose');

const besoinSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Ressources matérielles', 'Besoins de formation'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  porteurProjet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Membre', // Le nom du modèle de porteur de projet
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Besoin', besoinSchema);
