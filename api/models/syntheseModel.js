const mongoose = require('mongoose');

const syntheseSchema = new mongoose.Schema({
  synthesis: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  candidatCreathon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CandidatCreathon',
    required: true,
  },
});

const Synthese = mongoose.model('Synthese', syntheseSchema);

module.exports = Synthese;
