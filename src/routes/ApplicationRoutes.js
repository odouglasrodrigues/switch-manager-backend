/**
 * Arquivo: ApplicationRouesjs
 * Descrição: Arquivo responsável pela rotas da aplicação.
 */

const express = require('express');

const router = express.Router();
const auth = require('../middlewares/auth');
const ApplicationController = require('../controllers/ApplicationController');

router.post('/login', ApplicationController.Login);
router.post('/teste', auth, ApplicationController.Login);

module.exports = router;
