const express = require("express");
const router = express.Router();
const creathonController = require("../controllers/creathonController");
const middlewareRepetition = require("../middlewares/auth");
const updateCreathonStatusMiddleware = require("../middlewares/updateCreathonStatusMiddleware");

router.post(
  "/create",
  /*middlewareRepetition.loggedMiddleware, middlewareRepetition.isAdmin,*/
  creathonController.createCreathon
);
router.get(
  "/creathonsListe",
  updateCreathonStatusMiddleware, // Exécutez le middleware avant d'obtenir la liste des Creathons
  /*middlewareRepetition.loggedMiddleware, middlewareRepetition.isAdmin,*/
  creathonController.getAllCreathons
);
router.delete(
  "/:id",
  /*middlewareRepetition.loggedMiddleware, middlewareRepetition.isAdmin,*/
  creathonController.deleteCreathon
);
router.patch(
  "/:id/updateStatus",
  /*middlewareRepetition.loggedMiddleware, middlewareRepetition.isAdmin,*/
  creathonController.updateCreathonStatus
);
//router.post("/synthesis", creathonController.createSynthesis);
router.get(
  "/details/:id",
  /*middlewareRepetition.loggedMiddleware, middlewareRepetition.isAdmin,*/
  creathonController.getCreathonById
);
router.get('/creathonsListe', creathonController.getAllCreathons);

module.exports = router;
