const knex = require('knex'); //Importação do knex
const configuration = require('../../knexfile'); //Importação das configurações do BD que estão no 'knexfile.js'

const config = process.env.NODE_ENV == 'test' ? configuration.test : configuration.development;
//Variável config: Se a variável ambiente for a test, usará configuration.test, se não, usa a padrão development

const connection = knex(config); //Criando conexão de tipo desenvolvimento (contido no 'knexfile.js');

module.exports = connection; //Exportando a conexão com o BD daqui para ser usado em arquivos externos