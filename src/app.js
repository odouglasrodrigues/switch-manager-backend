/**
 * Arquivo: app.js
 * Descrição: Arquivo responsável por toda a configuração e execução da aplicação.
 */

const express = require('express');
const cors = require('cors');
const ApplicationRoutes = require('./routes/ApplicationRoutes');
const SequelizeConnection = require('./db/conn');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('sequelize conncetion', SequelizeConnection);

app.use('/', ApplicationRoutes);

module.exports = app;
