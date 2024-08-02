const express = require("express");
const router = express.Router();
const { createReunion } = require("../controllers/reunionController");

// Define the route for creating a reunion
router.post("/add", createReunion);

module.exports = router;
