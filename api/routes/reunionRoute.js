const express = require("express");
const router = express.Router();
const { createReunion } = require("../controllers/reunionController");
const {getAllReunions} = require ("../controllers/reunionController");
const {getReunionsByProjectHolderId} = require ("../controllers/reunionController");

// Define the route for creating a reunion
router.post("/add", createReunion);
router.get("/", getAllReunions);
router.get('/project-holder/:projectHolderId', getReunionsByProjectHolderId);


module.exports = router;
