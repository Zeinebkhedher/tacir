const express = require("express");
const router = express.Router();
const formationController = require("../controllers/tacirFormationController");

router.get("/formations-with-accepted-beneficiaries", formationController.getFormationsWithAcceptedBeneficiaires);

router.post("/", formationController.createFormation);
router.post("/:id", formationController.addParticipantToFormation);

router.get("/", formationController.getAllFormations);

// Get a single formation by ID
router.get("/:id", formationController.getFormationById);
router.get(
  "/:id/participants",
  formationController.getParticipantsByFormationId
);
  
// Update a formation
router.put("/:id", formationController.updateFormation);

// Delete a formation
router.delete("/:id", formationController.deleteFormation);
router.post(
  "/beneficiaire/:id/",
  formationController.addBeneficiaire
);
router.get(
  "/:id/beneficiaires",
  formationController.getBeneficiairesByFormation
);

module.exports = router;
