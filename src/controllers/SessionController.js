const connection = require('../database/connection'); //Importação da conexão com o BD

module.exports = {
    async create(request, response){ //Criação de uma sessão de Login
        const { id } = request.body; //ID da ong que quer fazer login virá atrabés daqui, do corpo

        const ong = await connection('ongs') //Acessa a tabela de registro das ongs
        .where('id', id) //Quando o ID da tabela da ONG for igual ao ID 
        .select('name') //A informação retornada para o front-end será apenas o nome da ONG
        .first(); //retorno de apenas um resultado

        if(!ong){ //Se a ONG não existir
            return response.status(400).json({ error: 'No ONG found with this ID' });
            //Status de erro 400 BadRequest
        }

        console.log(id);

        return response.json(ong); //Se tudo der certo, retornar o resultado de ong, que é somente o nome
    }
}



/*[
  {
    "id": "06b1ea7d",
    "name": "SARA_Test1",
    "email": "funcacaosara@gmail.com",
    "whatsapp": "(38)3214-5500",
    "city": "Montes Claros",
    "uf": "MG"
  }
]*/