const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactControllerTacir");
const logged = require("../middlewares/auth");
// Route to get contacts by role
router.get("/:role", contactController.getContactsByRole);
router.post(
  "/send-message",
  logged.loggedMiddleware,
  contactController.sendMessage
);
module.exports = router;
