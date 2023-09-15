const express = require('express');
const router = express.Router();
const controllerViagem = require('../controllers/viagensController');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: './public/imagesDestino/', 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });


router.get('/', (req, res) => {
  res.render('criar');
});

router.get('/home', controllerViagem.exibirViagens);
router.post('/excluirViagem/:IdViagens', controllerViagem.excluirViagem);
router.post('/criarViagem', upload.single('imagem'), controllerViagem.criarViagem);
router.get('/:IdViagens/editar', controllerViagem.mostrarFormularioEdicao);
router.post('/:IdViagens/editar',upload.single('imagem'),  controllerViagem.editarViagem);
module.exports = router;
