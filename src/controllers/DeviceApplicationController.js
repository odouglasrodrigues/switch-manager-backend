/**
 * Arquivo: DeviceApplicationController.js
 * Descrição: Arquivo responsável por controlar as ações das rotas
 * e executar os processos do dispositivo.
 */

const shell = require('shelljs');
const path = require('path');
const Dispositivo = require('../models/DeviceModel');

exports.ChangeDevice = async (req, res) => {
  try {
    await Dispositivo.update(
      {
        name: req.body.name,
        password: req.body.password,
        user: req.body.user,
        active: req.body.active,
        port: req.body.port,
        type: req.body.type,
        ip: req.body.ip,
        protocolo: req.body.protocolo,
      },
      { where: { id: req.body.id } },
    );
    const dispositivos = await Dispositivo.findAll();
    return res
      .status(201)
      .json({ status: 'sucesso', message: 'Equipamento atualizado com sucesso!', dados: { dispositivos } });
  } catch (error) {
    return res
      .status(401)
      .json({ status: 'erro', message: 'Não foi possivel alterar os dados do equipamento' });
  }
};

exports.NewDevice = async (req, res) => {
  try {
    const IPExiste = await Dispositivo.findAll({
      where: { ip: req.body.ip },
    });

    if (IPExiste.length > 0) {
      console.log(IPExiste);
      return res
        .status(201)
        .json({ status: 'erro', message: 'O IP informado já está cadastrado!', dados: {} });
    }
    await Dispositivo.create(req.body);
    const dispositivos = await Dispositivo.findAll();
    return res
      .status(201)
      .json({ status: 'sucesso', message: 'Equipamento criado com sucesso!', dados: { dispositivos } });
  } catch (error) {
    return res
      .status(401)
      .json({ status: 'erro', message: 'Não foi possivel criar o equipamento' });
  }
};

exports.ListDevices = async (req, res) => {
  try {
    const SwitchList = await Dispositivo.findAll();

    return res
      .status(201)
      .json({ status: 'sucesso', message: 'Equipamentos listados com sucesso!', dados: { SwitchList } });
  } catch (error) {
    return res
      .status(401)
      .json({ status: 'erro', message: 'Não foi possivel listar os equipamentos' });
  }
};

exports.TestDeviceConnection = async (req, res) => {
  try {
    const cmd = path.resolve(`src/methods/TestConnection.py ${req.body.ip} ${req.body.user} ${req.body.password} ${req.body.port}`);
    const returnCommand = await shell.exec(`python3 ${cmd}`).stdout;
    res.json(JSON.parse(returnCommand));
  } catch (error) {
    return res
      .status(401)
      .json({ status: 'erro', message: 'Houve uma falha ao conectar-se com o equipamento' });
  }
};

exports.ListDeviceInterfaces = async (req, res) => {
  try {
    const cmd = path.resolve(`src/methods/InterfaceList.py ${req.body.ip} ${req.body.user} ${req.body.password} ${req.body.port}`);
    const returnCommand = await shell.exec(`python3 ${cmd}`).stdout;
    res.json(JSON.parse(returnCommand));
  } catch (error) {
    return res
      .status(401)
      .json({ status: 'erro', message: 'Houve uma falha ao conectar-se com o equipamento' });
  }
};

exports.GetInterfaceDetail = async (req, res) => {
  try {
    const cmd = path.resolve(`src/methods/InterfaceInfoDetail.py ${req.body.ip} ${req.body.user} ${req.body.password} ${req.body.port} ${req.body.interface}`);
    const returnCommand = await shell.exec(`python3 ${cmd}`).stdout;
    res.json(JSON.parse(returnCommand));
  } catch (error) {
    return res
      .status(401)
      .json({ status: 'erro', message: 'Houve uma falha ao conectar-se com o equipamento' });
  }
};

exports.TurnOnOffInterface = async (req, res) => {
  try {
    const cmd = path.resolve(`src/methods/TurnOnOffInterface.py ${req.body.ip} ${req.body.user} ${req.body.password} ${req.body.port} ${req.body.interface} ${req.body.turnonoff}`);
    const returnCommand = await shell.exec(`python3 ${cmd}`).stdout;
    res.json(JSON.parse(returnCommand));
  } catch (error) {
    return res
      .status(401)
      .json({ status: 'erro', message: 'Houve uma falha ao conectar-se com o equipamento' });
  }
};
