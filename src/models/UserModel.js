/**
 * Arquivo: UserModel.js
 * Descrição: Schema do banco de dados da tabela de Usuários.
 */

const Sequelize = require('sequelize');
const db = require('../db/conn');

const Usuarios = db.define('usuarios', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  permissions: {
    type: Sequelize.JSON,
  },
});

module.exports = Usuarios;
