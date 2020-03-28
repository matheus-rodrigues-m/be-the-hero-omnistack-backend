const connection = require('../database/connection'); //Importação da conexão com o BD

module.exports = { //Exportar o objeto que será inserido aqui
    async index(request, response) { //1-Criação do método para listagem de casos
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ong_id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

            response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },


    async create(request, response) { //2-Método para criação de um incidente
        const { title, description, value } = request.body; //Parâmetros/campos passados para e um incidente
        const ong_id = request.headers.authorization; //Busca de valores do cabeçalho 
        //(como usuário, location, language, etc) do cabeçalho que definimos no Insomnia>Incidents>Create>Header

        const [id] = await connection('incidents').insert({ //Passagem de parâmetros para o Banco de Dados
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id }); //Retorno do id da tabela

    },

    async delete(request, response) { //3-Método para deletar um incidente
        const { id } = request.params; //Pegar ID do parâmetro de Rota

        const ong_id = request.headers.authorization; //Pega ID da ONG pelo Header da Ong
        //ID da ONG foi solicitado para que possa verificar se o ID do incidente {id} pertence a tal ONG

        const incident = await connection('incidents') //Busca um Incidente na tabela incidents
            .where('id', id) //Onde o campo 'id' for igual ao { id }
            .select('ong_id') //Selecionar apenas a coluna do id da ONG
            .first(); //Para retornar apenas um resultado (já que apenas um cai bater com o outro ID da Ong)

        if (incident.ong_id != ong_id) { //Se o ong_id do incidente for diferente do ong_id criado

            return response.status(401).json({ error: 'Operation not permited.' }); //ERRO 401 (não permitido)

        }

        await connection('incidents').where('id', id).delete(); //Caso tudo dê certo, deleta a tabela onde id = id

        return response.status(204).send(); //deu sucesso, 204 (sem conteúdo a ser enviado)
    }
};