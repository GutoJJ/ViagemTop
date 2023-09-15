const conexao = require('./DBconfig');
const crypto = require('crypto');

const verificacao = (email, senha, callback) => {
  let meudeusSenha = crypto.createHash('md5');
  let meudeusNome = meudeusSenha.update(senha).digest('hex');
  const query = 'SELECT * FROM cliente WHERE email = ? AND senha = ?';
  console.log("Consultando com email e senha: ", email, meudeusNome);
  conexao.query(query, [email, meudeusNome], callback);
  console.log("usuario entro ", email, meudeusNome);
  
};

module.exports = {
  verificacao
};
