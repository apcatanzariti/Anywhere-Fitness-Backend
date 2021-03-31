exports.up = async (knex) => {
  await knex.schema
    
    .createTable('users', table => {
      table.increments('user_id');
      table.string('username', 200)
        .notNullable()
        .unique();
      table.string('password', 200)
        .notNullable();
      table.string('role', 128)
        .notNullable();
      table.string('email', 320)
        .notNullable()
        .unique();
      table.timestamps(false, true);
    })

    .createTable('classes', table => {
      table.increments('class_id');
      table.string('class_name', 320)
        .notNullable();
      table.string('class_type', 280)
        .notNullable()
      table.string('class_start', 128)
        .notNullable();
      table.decimal('class_duration')
        .notNullable()
        .unsigned();
      table.integer('class_intensity')
        .notNullable()
        .unsigned()
      table.string('class_location', 320)
        .notNullable()
      table.integer('class_client_number')
        .notNullable()
        .default(0)
        .unsigned();
      table.integer('class_max_size')
        .notNullable()
        .default(0)
        .unsigned();
      table.integer('class_instructor')
        .notNullable()
        .unsigned()
        .references('user_id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })

    .createTable('clients_classes', table => {
      table.increments('client_class_id');
      table.integer('class')
        .notNullable()
        .unsigned()
        .references('class_id')
        .inTable('classes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.integer('client')
        .notNullable()
        .unsigned()
        .references('user_id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
}

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('clients_classes')
    .dropTableIfExists('classes')
    .dropTableIfExists('class_intensity')
    .dropTableIfExists('class_types')
    .dropTableIfExists('users')
    .dropTableIfExists('roles');
};
