const express = require('express');
const router = express.Router();
const {
  addOutput,
  deleteOutput,
  updateOutput,
  getAllOutputs,
  downloadFile,
  getOutputById,
  getOutputsByCreathonId,
  addComment,
  getCommentsById,
  updateComment,
  deleteComment
} = require('../controllers/outputController');
const auth = require ('../middlewares/auth')
router.post('/add', addOutput);
router.delete('/:outputId', deleteOutput);
router.put('/:outputId', updateOutput);
router.get('/', getAllOutputs);
router.get('/download/:filePath', downloadFile);
router.get('/:id',getOutputById); 
router.get('/creathon/:creathonId',getOutputsByCreathonId);
router.post('/comment', auth.loggedMiddleware, addComment);
router.get('/listeComments/:id', getCommentsById); 
router.patch('/updateComment/:commentId',updateComment); 
router.delete('/deleteComment/:commentId',deleteComment);

module.exports = router;
