const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// rotas (users)
router.post('/store', UserController.store);
router.delete('/del/:id', UserController.destroy);
router.put('/upd/:id', UserController.update);
router.put('/:id/updpsw', UserController.updatePassword);
router.get('/show', UserController.show);
router.get('/show/email/*', UserController.showe);
router.get('/count', UserController.count);
router.post('/login', UserController.login);
router.put('/:id/disable', UserController.disable);
router.put('/:id/activate', UserController.activate);

module.exports = router;