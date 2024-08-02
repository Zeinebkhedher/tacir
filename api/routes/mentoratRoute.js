const express = require("express");
const router = express.Router();
const { createMentorat } = require("../controllers/mentoratController"); // Adjust the path to your controller

router.post("/add", createMentorat);

module.exports = router;
