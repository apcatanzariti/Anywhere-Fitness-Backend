exports.seed = function(knex) {
        return knex('clients_classes').insert([
          {class: 1, client: 2},
          {class: 2, client: 2}
        ]);
};

// DOESNT WORK