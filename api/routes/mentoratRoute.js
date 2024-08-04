const express = require("express");
const router = express.Router();
const { createMentorat } = require("../controllers/mentoratController"); // Adjust the path to your controller
const {getAllMentorats} = require ("../controllers/mentoratController")
router.post("/add", createMentorat);
router.get("/", getAllMentorats);

module.exports = router;
