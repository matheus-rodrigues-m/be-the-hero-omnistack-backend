const knex = require('knex'); //Importação do knex
const configuration = require('../../knexfile'); //Importação das configurações do BD que estão no 'knexfile.js'

const connection = knex(configuration.development); //Criando conexão de tipo desenvolvimento (contido no 'knexfile.js');

module.exports = connection; //Exportando a conexão com o BD daqui para ser usado em arquivos externos