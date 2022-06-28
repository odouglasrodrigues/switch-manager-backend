/**
 * Arquivo: UserApplicationController.js
 * Descrição: Arquivo responsável por controlar as ações das rotas
 * e executar os processos de usuários.
 */
const Usuarios = require('../models/UserModel');

exports.NewUser = async (req, res) => {
  try {
    // await Usuarios.create(req.body);
    const users = await Usuarios.findAll();
    console.log(users);
    return res
      .status(201)
      .json({ status: 'sucesso', message: 'Login realizado com sucesso', dados: {} });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ status: 'erro', message: 'Não foi possivel realizar o login' });
  }
};

exports.Login = (req, res) => {
  try {
    res
      .status(201)
      .json({ status: 'sucesso', message: 'Login realizado com sucesso', dados: {} });
  } catch (error) {
    return res
      .status(401)
      .json({ status: 'erro', message: 'Não foi possivel realizar o login' });
  }
};
