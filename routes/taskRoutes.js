const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');

// rotas (tasks)
router.get('/show', TaskController.show);
router.get('/overdue', TaskController.overdue);
router.get('/:taskId', TaskController.index); // show (pelo ID)
router.get('/:taskId/solution', TaskController.solution);
router.post('/:taskId/done', TaskController.markAsDone);
router.post('/store', TaskController.store);
router.put('/:taskId/deadline', TaskController.setDeadline);
router.delete('/del/:taskId', TaskController.destroy);
router.delete('/delCompleted', TaskController.deleteCompleted);
router.put('/upd/:taskId', TaskController.update);
router.put('/:taskId/assign', TaskController.assign);
router.post('/:taskId/reopen', TaskController.reopen);
router.get('/priority/:priority', TaskController.byPriority);
router.post('/assign-multiple', TaskController.assignMultiple);
router.post('/duplicate/:taskId', TaskController.duplicate);

module.exports = router;