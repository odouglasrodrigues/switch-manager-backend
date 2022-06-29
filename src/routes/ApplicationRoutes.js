/**
 * Arquivo: ApplicationRouesjs
 * Descrição: Arquivo responsável pela rotas da aplicação.
 */

const express = require('express');

const router = express.Router();
const auth = require('../middlewares/auth');
const UserApplicationController = require('../controllers/UserApplicationController');
const DeviceApplicationController = require('../controllers/DeviceApplicationController');

// Rotas de  Gestão de usuário
router.post('/login', UserApplicationController.Login);
router.post('/newuser', auth, UserApplicationController.NewUser);
router.post('/changeuserstatus', auth, UserApplicationController.ChangeUser);

// Rotas de gestão do equipamento
router.post('/newdevice', auth, DeviceApplicationController.NewDevice);
router.post('/changedevice', auth, DeviceApplicationController.ChangeDevice);

// Rotas para execução de comandos no equipamento
router.post('/testdeviceconnection', auth, DeviceApplicationController.TestDeviceConnection);

module.exports = router;
