const conexao = require('./DBconfig');
const buscarViagens = (callback) => {
    const query = 'SELECT * FROM viagens';
    
    conexao.query(query, (error, viagens) => {
      if (error) {
        console.error('Erro ao buscar viagens:', error);
        callback(error, null);
      } else {
        callback(null, viagens);
      }
    });
  };
const criarViagem = (viagemData, callback) => {
    const {
      destino,
      dataSaida,
      dataChegada,
      descricao,
      imagem,
      valor,
      id_Cliente, 
    } = viagemData;
  
    const query = `
      INSERT INTO viagens (destino, dataSaida, dataChegada, descricao, imagem, valor, id_Cliente)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    const values = [destino, dataSaida, dataChegada, descricao, imagem, valor, id_Cliente];
  
    conexao.query(query, values, (error, results) => {
      if (error) {
        console.error('Erro ao criar a viagem:', error);
        return callback(error, null);
      }
      const ViagemId = results.insertId;
      callback(null, ViagemId);
    });
  };
  const excluirViagem = (IdViagens, callback) => {
    const query = 'DELETE FROM viagens WHERE IdViagens = ?';
  
    conexao.query(query, [IdViagens], (error) => {
      if (error) {
        console.error('Erro ao excluir viagem:', error);
        callback(error);
      } else {
        callback(null);
      }
    });
  };
  
  const obterViagemPorId = (IdViagens, callback) => {
    const query = 'SELECT * FROM viagens WHERE IdViagens = ?';
    conexao.query(query, [IdViagens], (error, results) => {
      if (error) {
        console.error('Erro ao obter a viagem por ID:', error);
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback('Viagem não encontrada', null);
      }
      const viagem = results[0];
      callback(null, viagem);
    });
  };
  
  const editarViagem = (IdViagens, dadosEdicao, callback) => {
    const query = `
      UPDATE viagens
      SET destino = ?, dataSaida = ?, dataChegada = ?, descricao = ?, valor = ?
      WHERE IdViagens = ?;
    `;
  
    const { destino, dataSaida, dataChegada, descricao, valor } = dadosEdicao;
  
    const values = [destino, dataSaida, dataChegada, descricao, valor, IdViagens];
  
    conexao.query(query, values, (error, results) => {
      if (error) {
        console.error('Erro ao editar a viagem:', error);
        return callback(error);
      }
      callback(null);
    });
  };
  

  module.exports = {
    excluirViagem,
    criarViagem,buscarViagens,editarViagem,obterViagemPorId
  };