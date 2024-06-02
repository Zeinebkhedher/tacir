// models/Planning.js
const mongoose = require('mongoose');

const PlanningSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    candidatsCreathon: [{ type: mongoose.Schema.Types.ObjectId, ref: 'candidatsCreathon' }] // Ajout du champ candidatsCreathon
}
, { timestamps: true });

module.exports = mongoose.model('Planning', PlanningSchema);
