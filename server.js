const express = require('express');
const express_layout = require('express-ejs-layouts');
const ejs = require('ejs');
const md5 = require('md5');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const viagemModel = require('./models/viagemModel');
const app = express();
const porta = 4200;

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'style')));
app.use(session({
    secret:'biscoituu',
    resave:false,
    saveUninitialized:true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req,res) =>{
    res.render('login');
});

const rotaCadastro = require('./rotas/cadastro');
app.use('/cadastro', rotaCadastro);

const rotaLogin = require('./rotas/login');
app.use('/login', rotaLogin);

const rotaviagem = require('./rotas/viagem');
app.use('/viagem', rotaviagem);

app.get('/home', (req, res) => {
    viagemModel.buscarViagens((error, viagens) => {
      if (error) {
        console.error('Erro ao buscar viagens:', error);
        res.status(500).send('Erro ao buscar viagens');
      } else {
        res.render('home', { viagens }); 
      }
    });
  });

app.get('/criar', (req, res) => {
    res.render('criar');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/perfil', (req, res) => {
    res.render('perfil');
});


app.listen(porta, () => {
    console.log("Servidor tá em: http://127.0.0.1:"+porta);
});
