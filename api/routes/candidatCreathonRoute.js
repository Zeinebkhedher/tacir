const express = require("express");
const router = express.Router();
const candidatCreathonController = require("../controllers/candidatCreathonController");

// Route pour créer un candidat Creathon
router.post("/sendCandidatureCreathon", candidatCreathonController.createCandidatCreathon);

// Route pour obtenir tous les candidats Creathon
router.get("/", candidatCreathonController.getCandidatCreathon);

// Route pour supprimer un candidat Creathon
router.delete("/:id", candidatCreathonController.deleteCandidatCreathon);


router.get("/details/:id", candidatCreathonController.getCandidatCreathonById);


module.exports = router;
