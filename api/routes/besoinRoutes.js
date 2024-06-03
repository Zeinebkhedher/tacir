// routes/besoinRoutes.js

const express = require('express');
const router = express.Router();
const besoinController = require('../controllers/besoinController');
const auth = require("../middlewares/auth")

router.post('/create', auth.loggedMiddleware, auth.isProteurProjet, besoinController.createBesoin);
router.get('/besoinsListe', besoinController.getAllBesoins);
router.delete('/delete/:type/:index', besoinController.deleteBesoin);
//router.get('/porteurs', besoinController.getBesoinsByPorteur);

module.exports = router;
