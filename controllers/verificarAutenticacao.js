const verificarAutenticacao = (req, res, next) => {
    if (req.session.loggedin) {
      
      next();
    } else {
      
      res.status(401).send('Você não está autenticado. Faça login para continuar.');
    }
  };
  module.exports = {
    verificarAutenticacao,
  }