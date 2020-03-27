const connection = require('../database/connection'); //Importação da conexão com o BD

module.exports = {
    async index(request, response) { //Listagem de casos de determinada ONG
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents') //A constante incidents recebe a tabela incidents
        .where('ong_id', ong_id) //E quanto o ID da ONG na tabela for igual ao da constante criada
        .select('*'); //Selecionar todos os dados desta tabela

        return response.json(incidents); //Retorna o resultado da constante incidents anterior
    }

}