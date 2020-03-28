const generateUniqueId = require('../../src/utils/generateUniqueId'); //Importa a função de ID único da utils

describe('Generate Unique ID', () => { //Descrição e uma categoria para o teste
    it('should generate in unique id', () => { //Início e descrição do teste
        const id = generateUniqueId();
    
        expect(id).toHaveLength(8); //Espera-se que o id tenha 8 caracteres
    });
});