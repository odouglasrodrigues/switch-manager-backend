/**
 * Arquivo: conn.js
 * Descrição: Arquivo responsável por se conectar ao banco de dados.
 */

const { Sequelize } = require('sequelize');

exports.sequelize = new Sequelize('switchmanager', 'switchmanager', 'senhadobancodedados', {
  host: 'localhost',
  dialect: 'mysql',
});
