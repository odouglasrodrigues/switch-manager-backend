/**
 * Arquivo: ApplicationRouesjs
 * Descrição: Arquivo responsável pela rotas da aplicação.
 */

const express = require('express');

const router = express.Router();
// const auth = require('../middlewares/auth');
const UserApplicationController = require('../controllers/UserApplicationController');

router.post('/login', UserApplicationController.Login);
router.post('/newuser', UserApplicationController.NewUser);

module.exports = router;
