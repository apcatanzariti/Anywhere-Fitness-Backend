exports.seed = function(knex) {
        return knex('classes').insert([
          {class_name: 'Awesome Yoga', class_type: 'Yoga', class_start: '10:00am EST', class_duration: 1, class_intensity: 5, class_location: '123 Main St. Somewhere, CA, 01234', class_client_number: 1, class_max_size: 10, class_instructor: 1},
          {class_name: 'Awesome Pilates', class_type: 'Pilates', class_start: '11:00am EST', class_duration: 1.5, class_intensity: 7, class_location: '1234 Main St. Somewhere, CA, 01234', class_client_number: 1, class_max_size: 8, class_instructor: 1}
        ]);
};

// DOESNT WORK