exports.up = async (knex) => {
  await knex.schema

    .createTable('roles', table => {
      table.increments('role_id');
      table.string('role_type', 128)
        .notNullable()
        .unique();
    })
    
    .createTable('users', table => {
      table.increments('user_id');
      table.string('username', 200)
        .notNullable()
        .unique();
      table.string('password', 200)
        .notNullable();
      table.integer('role')
        .notNullable()
        .unsigned()
        .references('role_id')
        .inTable('roles');
      table.string('email', 320)
        .notNullable()
        .unique();
      table.timestamps(false, true);
    })

    .createTable('class_types', table => {
      table.increments('class_type_id');
      table.string('type_name', 128)
        .notNullable()
        .unique();
    })

    .createTable('class_intensity', table => {
      table.increments('intensity_id');
      table.string('intensity_level', 128)
        .notNullable()
        .unique();
    })

    .createTable('classes', table => {
      table.increments('class_id');
      table.string('class_name', 320)
        .notNullable();
      table.integer('class_category')
        .notNullable()
        .unsigned()
        .references('class_type_id')
        .inTable('class_types')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.string('class_start', 128)
        .notNullable();
      table.decimal('class_duration')
        .notNullable()
        .unsigned();
      table.integer('class_intensity')
        .notNullable()
        .unsigned()
        .references('intensity_id')
        .inTable('class_intensity')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
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
