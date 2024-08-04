const express = require("express");
const router = express.Router();
const { createMentorat } = require("../controllers/mentoratController"); // Adjust the path to your controller
const {getAllMentorats} = require ("../controllers/mentoratController")
const { getMentoratsByRegion } = require("../controllers/mentoratController"); // Adjust the path to your controller

router.post("/add", createMentorat);
router.get("/", getAllMentorats);
router.get("/byRegion", getMentoratsByRegion);

module.exports = router;
