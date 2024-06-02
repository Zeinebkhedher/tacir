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
  }
}
,  { timestamps: true });

module.exports = mongoose.model('Besoin', besoinSchema);

