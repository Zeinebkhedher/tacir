const router = require("express").Router();
const candidatController = require("../controllers/candidattacirController");
const dateMiddleware = require("../middlewares/dateRangeMiddleware");
const middlewareDate = require("../middlewares/auth");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/verif", candidatController.addEmailCandidat);
router.get("/:id/verify/:token/", candidatController.getToken);
router.post(
  "/formulaire/date",
  //middlewareDate.loggedMiddleware, middlewareDate.isAdmin,
  candidatController.dateFormRange
);
router.put(
  "/form/date",
  middlewareDate.loggedMiddleware,
  middlewareDate.isAdmin,
  candidatController.updateDateRange
);
router.post(
  "/formulaire/:id",
  dateMiddleware,
  candidatController.rempFormulaire
);
router.get(
  "/getAllCandidats",
  //middlewareDate.loggedMiddleware, middlewareDate.isCoordinateurGeneral, middlewareDate.isCoordinateurRegional,
  candidatController.getAllCandidats
);
router.put(
  "/status/:id",
  //middlewareDate.loggedMiddleware, middlewareDate.isAdmin, middlewareDate.isCoordinateurGeneral, middlewareDate.isCoordinateurRegional,
  candidatController.updateStatus
);


module.exports = router;
