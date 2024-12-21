const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// rotas (users)

// rotas (Giulianna Ellen e Sofia Teixeira)
router.post('/store', UserController.store);
router.delete('/del/:id', UserController.destroy);
router.get('/show', UserController.show);
router.get('/show/email/*', UserController.showe);

// rotas (Eduardo Ferreira e Victória Ferreira)
router.put('/upd/:id', UserController.update);
router.put('/:id/updpsw', UserController.updatePassword);
router.get('/count', UserController.count);
router.post('/login', UserController.login);
router.put('/:id/disable', UserController.disable);
router.put('/:id/activate', UserController.activate);

module.exports = router;