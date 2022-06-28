/**
 * Arquivo: UserApplicationController.js
 * Descrição: Arquivo responsável por controlar as ações das rotas
 * e executar os processos de usuários.
 */
const Usuarios = require('../models/UserModel');

exports.ChangeUser = async (req, res) => {
  try {
    await Usuarios.update(
      {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        active: req.body.active,
        permissions: req.body.permissions,
      },
      { where: { id: req.body.id } },
    );
    const users = await Usuarios.findAll();
    return res
      .status(201)
      .json({ status: 'sucesso', message: 'Usuário alterado com sucesso!', dados: { users } });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ status: 'erro', message: 'Não foi possivel alterar os dados do usuário' });
  }
};

exports.NewUser = async (req, res) => {
  try {
    const EmailExiste = await Usuarios.findAll({
      where: { email: req.body.email },
    });

    if (EmailExiste.length > 0) {
      console.log(EmailExiste);
      return res
        .status(201)
        .json({ status: 'erro', message: 'O Email informado já está cadastrado!', dados: {} });
    }
    await Usuarios.create(req.body);
    const users = await Usuarios.findAll();
    return res
      .status(201)
      .json({ status: 'sucesso', message: 'Cadastro realizado com sucesso!', dados: { users } });
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
