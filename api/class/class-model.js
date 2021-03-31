const db = require('./../data/db-config');

async function findById(id) {
    const classData = await db('classes').where('class_id', id).first()
    .join('class_types', 'classes.class_category', 'class_types.class_type_id')
    .join('class_intensity', 'classes.class_intensity', 'class_intensity.intensity_id')
    .join('users', 'classes.class_instructor', 'users.user_id');

    return {
        class_id: classData.class_id,
        class_name: classData.class_name,
        class_category: classData.type_name,
        start_time: classData.class_start,
        class_duration: classData.class_duration,
        class_intensity: classData.intensity_level,
        class_location: classData.class_location,
        attendees: classData.class_client_number,
        max_class_size: classData.class_max_size,
        class_instructor: classData.username
    };
};

async function addClass(newClass) {
    const [id] = await db('classes').insert(newClass, 'class_id');

    return findById(id);
};

// findByInstructor

module.exports = {
    findById,
    addClass
};