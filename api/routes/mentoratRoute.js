const express = require("express");
const router = express.Router();
const { createMentorat,
    getAllMentorats,
    getMentoratsByRegion,
    getMentoratsForUser,
    getMentoratById,
    getMentoratWithOutputs
 } = require("../controllers/mentoratController"); // Adjust the path to your controller
const auth = require ('../middlewares/auth')
router.post("/add", createMentorat);
router.get("/", getAllMentorats);
router.get("/byRegion", getMentoratsByRegion);
router.get("/userMentorats",auth.loggedMiddleware,getMentoratsForUser); // Nouvelle route pour obtenir les mentorats d'un utilisateur
router.get('/:mentoratId',getMentoratById);
router.get('/:mentoratId/outputs', getMentoratWithOutputs);

module.exports = router;
