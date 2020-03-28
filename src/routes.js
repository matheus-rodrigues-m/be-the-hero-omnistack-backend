const express = require('express'); //Importando o express
const {celebrate, Segments, Joi} = require('celebrate');

const OngController = require('./controllers/OngController'); //**Import OngController (como se fosse struct/func do C++)

const IncidentController = require('./controllers/IncidentController'); //Importando IncidentController
const ProfileController = require('./controllers/ProfileController'); //Importando ProfileController
const SessionController = require('./controllers/SessionController'); //Importando SessionController

const routes = express.Router(); //Desacoplando as rotas do express em uma nova variável de rota, essa routes

routes.post('/sessions', SessionController.create); //5-Criando uma sessão Login (post)

routes.get('/ongs', OngController.index); //Importando a listagem Index do OngController - Rota de Lista das Ongs

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({ //Validação da criação de ONG
        name: Joi.string().required(), //Nome deve ser string e obrigatório
        email: Joi.string().required().email(), //Email deve ser string, obrigatório e em formato email
        whatsapp: Joi.string().required().min(10).max(11), //Whatsapp do tipo numero, obrigatorio, min de 10 caracteres e máximo de 11
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}) ,OngController.create); //Utilizando a variável que recebeu a importação do OngController 
// - Rota de Criação de Ongs e o celebrate chama a validação

routes.get('/profile', celebrate({ //Validação do login
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index); //4-Rota de exibir dados de apenas uma ONG

routes.get('/incidents', celebrate({ //Validação da Listagem de casos
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(), //Faz com que o número de página seja apenas numérico
    })
}), IncidentController.index); //1-Rota de Listagem de Casos

routes.post('/incidents', IncidentController.create); //2-Rota de Criação de Casos

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({ //Validação da exclusão de um caso
        id: Joi.number().required(), //é necessário um id do tipo numérico na URL para que seja válido
    })
}), IncidentController.delete); //3-Rota para Deletar Caso (Com ID como identificação)

module.exports = routes;