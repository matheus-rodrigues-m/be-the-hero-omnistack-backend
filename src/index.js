const express = require('express');
const routes = require('./routes'); //Importando rotas do routes pra cá (pegou do module do routes.js)
const cors = require('cors');

const app = express(); //Crianção da Aplicação

app.use(cors());
app.use(express.json());
app.use(routes); //Para que o app funcione da mesma forma com as rotas...


app.listen(3333); //Endereçamento da aplicação.