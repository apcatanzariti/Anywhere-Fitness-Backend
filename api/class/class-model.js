const db = require('./../data/db-config');

// find class by its id
async function findById(id) {
    const classData = await db('classes').where('class_id', id).first()
    .join('users', 'classes.class_instructor', 'users.user_id');

    return {
        class_id: classData.class_id,
        class_name: classData.class_name,
        class_type: classData.class_type,
        start_time: classData.class_start,
        class_duration: classData.class_duration,
        class_intensity: classData.class_intensity,
        class_location: classData.class_location,
        attendees: classData.class_client_number,
        max_class_size: classData.class_max_size,
        class_instructor: classData.username
    };
};

// add a new class
async function addClass(newClass) {
    const [id] = await db('classes').insert(newClass, 'class_id');

    return findById(id);
};


// update an existing class based upon id
async function update(id, changes) {
    await db('classes')
      .where('class_id', id)
      .update(changes)

    return findById(id);
};

// delete a class based upon id
function remove(id) {
    return db('classes').where('class_id', id).del();
};

// findByInstructor

module.exports = {
    findById,
    addClass,
    update,
    remove
};

// to do:
// require token to add class
// finish the stuff in the router