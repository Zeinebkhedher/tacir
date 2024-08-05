  const express = require("express");
  const router = express.Router();
  const formationController = require("../controllers/tacirFormationController");

  router.get("/formations-with-accepted-beneficiaries", formationController.getFormationsWithAcceptedBeneficiaires);
  router.get('/formations/:id/participants-beneficiaries', formationController.getParticipantsAndBeneficiariesByFormationId);
  router.put("/:formationId/beneficiaire/:beneficiaireId", formationController.updateBeneficiaireStatus);
  //router.patch('/:participantId/accept', formationController.acceptParticipant);
  //router.patch('/:participantId/refus', formationController.refuseParticipant);
  router.patch('/:formationId/accept', formationController.acceptParticipant);
router.patch('/:formationId/refus', formationController.refusParticipant);
router.patch('/:formationId/beneficiaires/:beneficiaryId/accept', formationController.acceptBeneficiary);

// Endpoint for refusing a beneficiary
router.patch('/:formationId/beneficiaires/:beneficiaryId/refuse', formationController.refuseBeneficiary);

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
