const express = require("express");
const router = express.Router();
const { createProject } = require("../controllers/tacirProjetController");
const { getAllProjects } = require("../controllers/tacirProjetController");
const authMiddleware = require("../middlewares/auth");
const { addEvaluation } = require("../controllers/tacirProjetController");
const { getEvaluationById } = require("../controllers/tacirProjetController");
const { getAllEvaluations } = require("../controllers/tacirProjetController");
const { getProjectByUserId } = require("../controllers/tacirProjetController");
const { getInovProjects } = require("../controllers/tacirProjetController");
const { getCreaProjects } = require("../controllers/tacirProjetController");

// Route to create a new project
router.post(
  "/add",
  authMiddleware.loggedMiddleware,
  authMiddleware.isCandidat,
  createProject
);
router.get("/listeProjet", getAllProjects);

router.post("/evaluate", authMiddleware.loggedMiddleware, addEvaluation);
router.get(
  "/evaluate/:evaluationId",
  authMiddleware.loggedMiddleware,
  getEvaluationById
);
router.get("/evaluations", getAllEvaluations);
router.get(
  "/user/:userId",
  authMiddleware.loggedMiddleware,
  getProjectByUserId
);
router.get("/inov", getInovProjects);

router.get("/crea", getCreaProjects);

module.exports = router;
