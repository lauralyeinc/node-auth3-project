
exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
        users.increments();          // id 
        users   
            .string('username', 128)           
            .notNullable()
            .unique();
        users.string('password', 128).notNullable();
        users.string('department', 128);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users'); 
};

//tablename users, (s is conventional, readme says user)
