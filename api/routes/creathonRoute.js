const express = require("express");
const router = express.Router();
const creathonController = require("../controllers/creathonController");
const middlewareRepetition=require("../middlewares/auth")

router.post("/create", /*middlewareRepetition.loggedMiddleware,middlewareRepetition.isAdmin,*/creathonController.createCreathon);
router.get("/creathonsListe", /*middlewareRepetition.loggedMiddleware,middlewareRepetition.isAdmin,*/creathonController.getAllCreathons);

module.exports = router;