exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('user_username', 200).notNullable()
      users.string('user_password', 200).notNullable()
      users.string('user_email', 320).notNullable()
      users.timestamps(false, true)

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

    .createTable('roles', table => {
      table.increments('role_id');
      table.string('role_type', 128)
        .notNullable()
        .unique();
    })

    .createTable('class_types', table => {
      table.increments('class_type_id');
      table.string('class_name', 128)
        .notNullable()
        .unique();
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users')
  await knex.schema
  .dropTableIfExists('roles')
  .dropTableIfExists('users');
}
