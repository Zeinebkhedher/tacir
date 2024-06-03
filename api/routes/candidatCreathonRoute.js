const express = require("express");
const router = express.Router();
const candidatCreathonController = require("../controllers/candidatCreathonController");
const { loggedMiddleware, isProteurProjet, extractPorteurProjetIdMiddleware } = require('../middlewares/auth');

// Route pour créer un candidat Creathon
router.post("/sendCandidatureCreathon", extractPorteurProjetIdMiddleware, loggedMiddleware, candidatCreathonController.createCandidatCreathon);

// Route pour obtenir tous les candidats Creathon
router.get("/", candidatCreathonController.getCandidatCreathon);

// Route pour supprimer un candidat Creathon
router.delete("/:id", candidatCreathonController.deleteCandidatCreathon);
router.patch('/:id', candidatCreathonController.updateCandidature);

router.get("/details/:id", candidatCreathonController.getCandidatCreathonById);
router.patch('/acceptatCandidature/:id', candidatCreathonController.acceptCandidature);
router.patch('/sendRejectionEmail/:id', candidatCreathonController.sendRejectionEmail);

router.get('/confirmed', candidatCreathonController.getConfirmedCandidats);
router.get('/rejected', candidatCreathonController.getRejectedCandidatures);
router.get('/acceptedCandidaturesCreathonListe', candidatCreathonController.getAcceptedCandidaturesCreathon);
router.patch('/synthese/:id', candidatCreathonController.addSynthese);
router.get('/acceptedCreathons', extractPorteurProjetIdMiddleware,loggedMiddleware, candidatCreathonController.getAcceptedCreathonsByPorteurProjet);

module.exports = router;
