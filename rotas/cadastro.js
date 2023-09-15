const express = require('express');
const router = express.Router();

const cadastroController = require('../controllers/cadastroController');


router.get('/', cadastroController.renderization);
router.post('/submit', cadastroController.criarCadastro);

module.exports = router;
