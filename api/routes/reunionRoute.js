const express = require("express");
const router = express.Router();
const { createReunion } = require("../controllers/reunionController");
const {getAllReunions} = require ("../controllers/reunionController");
const {getReunionsByProjectHolderId, getReunionsByUserId} = require ("../controllers/reunionController");
const auth = require ("../middlewares/auth");
// Define the route for creating a reunion
router.post("/add", createReunion);
router.get("/", getAllReunions);
router.get('/project-holder/:projectHolderId', getReunionsByProjectHolderId);

router.get('/porteurProjet',auth.loggedMiddlewareReunion , getReunionsByUserId);

module.exports = router;
