/**
 * Arquivo: auth.js
 * Descrição: Arquivo responsável por validar o token de autenticação do usuário.
 *
 */
const jwt = require('jsonwebtoken');

const secret = '1234';

function auth(req, res, next) {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    jwt.verify(token, secret);
    next();
  } catch (err) {
    return res.status(401).json({ status: 'erro', message: 'Falha na Autenticação!' });
  }
}

module.exports = auth;
