// routes/besoinRoutes.js

const express = require('express');
const router = express.Router();
const besoinController = require('../controllers/besoinController');

router.post('/create', besoinController.createBesoin);
router.get('/besoins', besoinController.getAllBesoins);
router.delete('/delete/:type/:index', besoinController.deleteBesoin);

module.exports = router;
