// routes/planningRoutes.js
const express = require('express');
const router = express.Router();
const planningController = require('../controllers/planningController');
const auth = require("../middlewares/auth")
router.get('/eventsListe',auth.isProteurProjet, planningController.getAllEvents);
router.post('/events', planningController.createEvent);
router.delete('/events/:id', planningController.deleteEvent);

module.exports = router;
