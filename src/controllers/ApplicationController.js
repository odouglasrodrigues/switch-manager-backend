/**
 * Arquivo: ApplicationController.js
 * Descrição: Arquivo responsável por controlar as ações das rotas e executar os processos.
 */

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
