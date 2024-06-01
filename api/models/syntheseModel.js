const mongoose = require('mongoose');

const syntheseSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
  },
  synthesis: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Synthese = mongoose.model('Synthese', syntheseSchema);

module.exports = Synthese;
