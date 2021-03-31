async function checkAddFields(req, res, next) {
    const { class_name, class_type, class_start, class_duration, class_intensity, class_location, class_max_size, class_instructor } = req.body;

    if (!class_name || !class_type || !class_start || !class_duration || !class_intensity || !class_location || !class_max_size || !class_instructor) {
        res.status(401).json({ message: 'All fields must be filled out.' });
    } else {
        next();
    }
};

async function checkUpdateFields(req, res, next) {
    const { class_name, class_type, class_start, class_duration, class_intensity, class_location, class_max_size } = req.body;

    if (!class_name || !class_type || !class_start || !class_duration || !class_intensity || !class_location || !class_max_size) {
        res.status(401).json({ message: 'All fields must be filled out.' });
    } else {
        next();
    }
};

module.exports = {
    checkAddFields,
    checkUpdateFields
};