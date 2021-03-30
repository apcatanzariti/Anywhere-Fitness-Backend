const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex.raw('TRUNCATE TABLE roles CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {role_id: 1, role_type: 'Instructor'},
        {role_id: 2, role_type: 'Client'}
      ]);
    });
};

// DOESNT WORK