const router = require("express").Router();
const membreController = require("../controllers/membreTacirController");
const middlewareDate = require("../middlewares/auth");

router.patch("/modifierTessiture/:id", middlewareDate.loggedMiddleware, middlewareDate.isAdmin, membreController.modifierTessiture);
router.post("/register", membreController.register);
router.post("/login", membreController.login);
router.get("/getMembreById/:id", middlewareDate.loggedMiddleware, middlewareDate.isAdmin, membreController.getMemberById);
router.get("/getAllMembers", membreController.getAllMembers);
router.get("/mentors", membreController.getAllMentors);
router.get("/porteurDeProjet", membreController.getAllPorteurDeProjet);
router.delete("/deleteMember/:id", middlewareDate.loggedMiddleware, middlewareDate.isAdmin, membreController.deleteMember);
router.patch("/updateMember/:id", middlewareDate.loggedMiddleware, middlewareDate.isAdmin, membreController.updateMember);
router.get("/mentors", membreController.getAllMentors);
router.get("/porteurDeProjet", membreController.getAllPorteurDeProjet);
module.exports = router;
