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
router.get("/files/:filePath", (req, res) => {
  const filePath = req.params.filePath;

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File not found" });
  }

  // Stream the file to the response
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});
module.exports = router;
