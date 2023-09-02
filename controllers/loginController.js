const express = require('express');
const router = express.Router();
const Modellogin = require('../models/login');

const renderization = (req, res) => {
  res.render('login');
};

const autentication = (req, res) => {
  const { email, senha } = req.body;
  console.log("Tentativa de autenticação: ", email, senha);
  
  if (!email || !senha) {
    console.log("Campos de autenticação vazios.");
    return res.status(400).render('login', { errorMessage: 'Preencha todos os campos.' });
  }

  Modellogin.verificacao(email, senha, (err, results) => {
    
    if (err) {
      console.error('Erro de verificação', err);
      return res.status(500).render('login', { errorMessage: 'Erro de usuário.' });
    }
  
    console.log('Resultados da verificação:', results);
  
    if (results.length === 0) {
      console.log("Credenciais inválidas.");
      return res.status(401).render('login', { errorMessage: 'Credenciais inválidas.' ,err});
    }

    req.session.loggedin = true;
    req.session.userId = results[0].idCliente; 
    console.log("Autenticação bem-sucedida para: ", email);
    res.redirect('/home');
  });
};

module.exports = {
  renderization,
  autentication,
};
