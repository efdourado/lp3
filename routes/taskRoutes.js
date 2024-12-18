const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');

// rotas (tasks)
router.get('/show', TaskController.show);
router.get('/:taskId', TaskController.index);
router.get('/:taskId/solution', TaskController.solution);
router.post('/:taskId/done', TaskController.markAsDone);
router.post('/store', TaskController.store);
router.delete('/:taskId', TaskController.destroy);
router.put('/:taskId', TaskController.update);

router.put('/:taskId/deadline', TaskController.setDeadline);
router.put('/:taskId/assign', TaskController.assign);
router.post('/:taskId/reopen', TaskController.reopen);
router.delete('del/completed', TaskController.deleteCompleted);

router.get('/priority/:priority', TaskController.byPriority);
router.get('/user/:userId', TaskController.byUser);
router.get('/filter', TaskController.filter);
router.get('/overdue', TaskController.overdue);
router.post('/assign-multiple', TaskController.assignMultiple);
router.post('/duplicate/:taskId', TaskController.duplicate);

module.exports = router;