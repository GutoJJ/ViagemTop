const mysql = require('mysql');

const conexao = mysql.createConnection({
    host:'sql10.freemysqlhosting.net',
    user:'sql10646165',
    password:'cSET8w1AYr',
    database:'sql10646165'
});

conexao.connect((err)=>{
    if(err){
        console.error("Deu erro seu otário >:( ",err);
        return;
    }
    console.log("CONECTOU EBAAAAAAA :) ");
});

module.exports = conexao;
