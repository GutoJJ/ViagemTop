const chamandoModel = require('../models/cadastro');
const express = require('express');

const renderization = (req, res) => {
    res.render('cadastro');
};

const criarCadastro = (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        return res.status(400).send("É obrigatório preencher todos os campos.");
    }

    chamandoModel.verificarUserBanco(email, (err, existe) => {
        if (err) {
            console.error("Erro de verificação! ", err);
            return res.status(500).send('Ocorreu um erro na verificação.');
        }
        if (existe) {
            return res.status(409).send('Este usuário já foi cadastrado.');
        }
        chamandoModel.usuarioUsar(nome, email, senha, (err, novoId) => {
            if (err) {
                console.error("Erro de cadastro! ", err);
                return res.status(500).send('Ocorreu um erro no cadastro.');
            }
            console.log("Cadastro realizado com sucesso! Novo ID: ", novoId);
            req.session.loggedin = true;
            req.session.usuarioId = novoId;
            res.redirect('/login');
        });
    });
};

module.exports = {
    renderization,
    criarCadastro,
};
