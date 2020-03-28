const express = require('express');
const routes = require('./routes'); //Importando rotas do routes pra cá (pegou do module do routes.js)
const { errors } = require('celebrate'); //Importação dos erros
const cors = require('cors');

const app = express(); //Crianção da Aplicação

app.use(cors());
app.use(express.json());
app.use(routes); //Para que o app funcione da mesma forma com as rotas...
app.use(errors()); //Faz uso do errors para que não dê erro 500 (aplicação não soube lidar com o erro)



module.exports = app;