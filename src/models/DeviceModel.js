/**
 * Arquivo: DeviceModel.js
 * Descrição: Schema do banco de dados da tabela de Dispositivos.
 */

const Sequelize = require('sequelize');
const db = require('../db/conn');

const Devices = db.define('devices', {
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
  user: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  port: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ip: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  protocolo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Devices;
