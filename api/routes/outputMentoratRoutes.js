const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const outputMentoratController = require('../controllers/outputMentoratController');


router.post('/add', outputMentoratController.addOutputMentorat);  // Example route
router.delete('/:outputId', outputMentoratController.deleteOutputMentorat);
router.put("/update/:outputId", outputMentoratController.updateOutputMentorat);
router.get("/all",  outputMentoratController.getAllOutputMentorats);
router.get("/mentorat/:mentoratId",  outputMentoratController.getOutputMentoratsByMentoratId);
router.get("/:id",  outputMentoratController.getOutputMentoratById);
router.get('/listeCommentsMentorat/:id', outputMentoratController.getCommentsById); 

router.post("/comment", auth.loggedMiddleware, outputMentoratController.addCommentToOutputMentorat);
router.get("/comments/:id",  outputMentoratController.getCommentsByOutputMentoratId);
router.put("/comment/:commentId",  outputMentoratController.updateCommentInOutputMentorat);
router.delete("/comment/:commentId", outputMentoratController.deleteCommentInOutputMentorat);

module.exports = router;
