
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table){
        table.increments(); //Incrementa um ID primary automaricamente a cada criação

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        table.string('ong_id').notNullable(); //ID cadastrado na tabela ong, então necessita de uma foreign key

        table.foreign('ong_id').references('id').inTable('ongs'); //ong_id referencia o id da tablea ongs
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};