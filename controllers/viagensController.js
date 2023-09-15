const viagemModel = require('../models/viagemModel');

const criarViagem = (req, res) => {
    const id_Cliente = req.session.userId;
    const viagemData = {
      destino: req.body.destino,
      dataSaida: req.body.dataSaida,
      dataChegada: req.body.dataChegada,
      descricao: req.body.descricao,
      imagem: req.file ? req.file.filename : null, 
      id_Cliente, 
      valor: req.body.valor,
    };
  
    viagemModel.criarViagem(viagemData, (error, ViagemId) => {
      if (error) {
        console.error('Erro ao criar a viagem:', error);
        res.status(500).send('Erro ao criar a viagem');
      } else {
        console.log('Nova viagem criada com sucesso:', ViagemId);
        res.redirect('/home');
      }
    });
  };
  const exibirViagens = (req, res) => {
    viagemModel.buscarViagens((error, viagens) => {
      if (error) {
        console.error('Erro ao buscar viagens:', error);
        res.status(500).send('Erro ao buscar viagens');
      } else {
        res.render('home', { viagens }); 
      }
    });
  };
  const excluirViagem = (req, res) => {
    const IdViagens = req.params.IdViagens; 
  
    viagemModel.excluirViagem(IdViagens, (error) => {
      if (error) {
        console.error('Erro ao excluir viagem:', error);
        res.status(500).send('Erro ao excluir viagem');
      } else {
        console.log('Viagem excluída com sucesso');
        res.redirect('/home');
      }
    });
  };


  const mostrarFormularioEdicao = (req, res) => {
    const IdViagens = req.params.IdViagens;
  
    viagemModel.obterViagemPorId(IdViagens, (error, viagem) => {
      if (error) {
        console.error('Erro ao obter a viagem para edição:', error);
        res.status(500).send('Erro ao obter a viagem para edição');
      } else {
        res.render('edicao', { viagem });
      }
    });
  };
  
  const editarViagem = (req, res) => {
    const IdViagens = req.params.IdViagens;
    const dadosEdicao = req.body;
  
    viagemModel.obterViagemPorId(IdViagens, (error, viagemAtual) => {
      if (error) {
        console.error('Erro ao obter a viagem para edição:', error);
        res.status(500).send('Erro ao obter a viagem para edição');
      } else {

        if (req.file) {
       
          dadosEdicao.imagem = req.file.filename;
        } else {

          dadosEdicao.imagem = viagemAtual.imagem;
        }
  
        viagemModel.editarViagem(IdViagens, dadosEdicao, (error) => {
          if (error) {
            console.error('Erro ao editar a viagem:', error);
            res.status(500).send('Erro ao editar a viagem');
          } else {
            res.redirect('/home');
          }
        });
      }
    });
  };
  
  module.exports = {
    criarViagem,exibirViagens,excluirViagem,editarViagem ,mostrarFormularioEdicao
  };