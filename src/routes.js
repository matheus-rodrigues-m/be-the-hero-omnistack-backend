const express = require('express'); //Importando o express

const OngController = require('./controllers/OngController'); //**Import OngController (como struct/func do C++)

const IncidentController = require('./controllers/IncidentController'); //Importando IncidentController
const ProfileController = require('./controllers/ProfileController'); //Importando ProfileController
const SessionController = require('./controllers/SessionController'); //Importando SessionController

const routes = express.Router(); //Desacoplando as rotas do express em uma nova variável de rota, essa routes

routes.post('/sessions', SessionController.create); //5-Criando uma sessão Login (post)

routes.get('/ongs', OngController.index); //Importando a listagem Index do OngController - Rota de Lista das Ongs
routes.post('/ongs', OngController.create); //Utilizando a variável que recebeu a importação do OngController 
// - Rota de Criação de Ongs

routes.get('/profile', ProfileController.index); //4-Rota de exibir dados de apenas uma ONG

routes.get('/incidents', IncidentController.index); //1-Rota de Listagem de Casos
routes.post('/incidents', IncidentController.create); //2-Rota de Criação de Casos
routes.delete('/incidents/:id', IncidentController.delete); //3-Rota para Deletar Caso (Com ID como identificação)

module.exports = routes;