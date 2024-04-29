const express = require("express");
const router = express.Router();
const { createProject } = require("../controllers/tacirProjetController");
const { getAllProjects } = require("../controllers/tacirProjetController");

// Route to create a new project
router.post("/add", createProject);
router.get("/listeProjet", getAllProjects);
module.exports = router;
