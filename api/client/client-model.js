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

// client can reserve spot in a class - space available will be checked using middleware
async function joinClass(classId, clientId, clientUsername) {
    await db('clients_classes').insert({ class: classId, client: clientId }, 'client_class_id');
    const joinedClass = await findById(classId);
    const updateAttendees = joinedClass.attendees + 1;
    await db('classes').where('class_id', classId).update('class_client_number', updateAttendees);
    return {
        username: clientUsername,
        class: joinedClass.class_name
    };
};

async function removeFromClass(classId, clientId) {
    const classInfo = await findById(classId);
    await db('clients_classes').where('class', classId).where('client', clientId).del();
    // update attendees here!!

    return {
        class_name: classInfo.class_name
    }
};

module.exports = {
    findById,
    joinClass,
    removeFromClass
};