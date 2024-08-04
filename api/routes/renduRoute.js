const express = require("express");
const router = express.Router();
const renduController = require("../controllers/renduController");
const auth = require("../middlewares/auth");

router.post("/rendu", renduController.addRendu);

router.delete("/rendu/:renduId", renduController.deleteRendu);

router.put("/rendu/:renduId/expiration", renduController.updateExpirationDate);

router.post(
  "/rendu/:renduId/upload",
  auth.loggedMiddleware,
  renduController.uploadFile
);
router.get("/rendus", renduController.getAllRendus);
router.get("/files/:filePath", renduController.downloadFile);
router.get("/forUser", auth.logged, renduController.getRendusForUser);

module.exports = router;
