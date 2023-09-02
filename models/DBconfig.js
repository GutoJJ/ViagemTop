const mysql = require('mysql');

const conexao = mysql.createConnection({
    host:'sql10.freemysqlhosting.net',
    user:'sql10643934',
    password:'4q4qZUxq1j',
    database:'sql10643934'
});

conexao.connect((err)=>{
    if(err){
        console.error("Deu erro seu otário >:( ",err);
        return;
    }
    console.log("CONECTOU EBAAAAAAA :) ");
});

module.exports = conexao;
