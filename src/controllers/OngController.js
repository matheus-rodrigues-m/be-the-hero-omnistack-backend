const connection = require('../database/connection'); //Estabelecendo conexão com o BD
const generadeUniqueId = require('../utils/generateUniqueId'); //Conecta com o generadeUniqueId do 'utils'

module.exports = { //Exportando um objeto com os métodos, para arquivos externos

    async index (request, response) { //Recortado do routes.js, para listagem das tabelas / ongs criadas
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response) {
        const {name, email, whatsapp, city, uf} = request.body; //Até o 'return', foi recortado de routes.js

        const id = generadeUniqueId();
        
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,

        })

    return response.json({ id });

    }
};