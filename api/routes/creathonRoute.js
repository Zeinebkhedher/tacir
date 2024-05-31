const express = require("express");
const router = express.Router();
const creathonController = require("../controllers/creathonController");
const middlewareRepetition=require("../middlewares/auth")

router.post("/create", /*middlewareRepetition.loggedMiddleware,middlewareRepetition.isAdmin,*/creathonController.createCreathon);
router.get("/creathonsListe", /*middlewareRepetition.loggedMiddleware,middlewareRepetition.isAdmin,*/creathonController.getAllCreathons);
router.delete("/:id", /*middlewareRepetition.loggedMiddleware,middlewareRepetition.isAdmin,*/creathonController.deleteCreathon);
router.patch("/:id/updateStatus", /*middlewareRepetition.loggedMiddleware,middlewareRepetition.isAdmin,*/creathonController.updateCreathonStatus);

module.exports = router;