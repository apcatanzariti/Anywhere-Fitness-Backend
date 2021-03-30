const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex.raw('TRUNCATE TABLE users CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'TestInstructor', password: bcrypt.hashSync('1234', 8), role: 1, email: 'user1@test.com'},
        {username: 'TestClient', password: bcrypt.hashSync('1234', 8), role: 2, email: 'user2@test.com'}
      ]);
    });
};

// DOESNT WORK