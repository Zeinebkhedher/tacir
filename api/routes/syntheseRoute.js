const express = require('express');
const router = express.Router();
const syntheseController = require('../controllers/syntheseController');

// Route pour enregistrer une synthèse
router.post('/syntheses', syntheseController.saveSynthese);

// Route pour récupérer toutes les synthèses enregistrées
router.get('/syntheses', syntheseController.getAllSyntheses);

module.exports = router;
