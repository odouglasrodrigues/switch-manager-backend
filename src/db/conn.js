/**
 * Arquivo: conn.js
 * Descrição: Arquivo responsável por se conectar ao banco de dados.
 */

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('switchmanager', 'switchmanager', 'senhadobancodedados', {
  host: 'localhost',
  dialect: 'mysql',
});

try {
  sequelize.sync()
    .then(() => {
      console.log('Conexão ao Banco de dados Realizada com sucesso');
    });
} catch (erro) {
  console.log(erro);
}

module.exports = sequelize;
