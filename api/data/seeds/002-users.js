const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
      return knex('users').insert([
        {username: 'TestInstructor', password: bcrypt.hashSync('1234', 8), role: 'Instructor', email: 'user1@test.com'},
        {username: 'TestClient', password: bcrypt.hashSync('1234', 8), role: 'Client', email: 'user2@test.com'}
      ]);
};

// DOESNT WORK