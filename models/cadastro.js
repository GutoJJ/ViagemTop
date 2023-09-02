const conexao = require('./DBconfig');
const crypto = require('crypto');

const usuarioUsar = (nome, email, senha, callback) => {
    const meudeusSenha = crypto.createHash('md5');
    const meudeusNome = meudeusSenha.update(senha).digest('hex');
    conexao.query('INSERT INTO cliente (nome, email, senha) VALUES (?, ?, ?)',
        [nome, email, meudeusNome],
        (err, result) => {
            if (err) {
                console.error("Erro ao cadastrar usuário: ", err);
                return callback(err, null);
            }
            console.log("Usuário cadastrado: ", nome, meudeusNome);

            const novoId = result.insertId;
            callback(null, novoId); 
        }
    );
}

const verificarUserBanco = (email, callback) => {
    conexao.query('SELECT * FROM cliente WHERE email = ?',
        [email], 
        (err, results) => {
            if(err){
                console.error("Tem algo de errado ai mermao", err);
                return callback(err, null);
            }
            if(results.length === 0){
                return callback(null, null);
            }
            const usuario = results[0];
            callback(null, usuario);
        }
    );
}

module.exports = {
    usuarioUsar,
    verificarUserBanco,
}
