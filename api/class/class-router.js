const router = require('express').Router();
const Class = require('./class-model');
const bcrypt = require('bcryptjs');
const restricted = require('./../middleware/restricted');
const { checkAddFields, checkUpdateFields } = require('./class-middleware');

// create a new class - this is for instructors - returns all the details of the new class to be used by the front end
router.post('/', restricted, checkAddFields, (req, res) => {
    const { class_name, class_type, class_start, class_duration, class_intensity, class_location, class_client_number, class_max_size, class_instructor } = req.body;

    const newClass = {
        class_name, 
        class_type, 
        class_start, 
        class_duration, 
        class_intensity, 
        class_location, 
        class_client_number, 
        class_max_size, 
        class_instructor
    }

    Class.addClass(newClass)
    .then(newClass => {
        res.status(200).json(newClass);
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong while adding this class', error: err.message });
    })
});

// update a class - this is for instructors - returns all the details of the updated class to be used by the front end
router.put('/:id', restricted, checkUpdateFields, (req, res) => {
    const id = req.params.id;

    const { class_name, class_type, class_start, class_duration, class_intensity, class_location, class_client_number, class_max_size } = req.body;

    const changes = {
        class_name, 
        class_type, 
        class_start, 
        class_duration, 
        class_intensity, 
        class_location, 
        class_client_number, 
        class_max_size
    }

    Class.update(id, changes)
    .then(updatedItem => {
        res.status(201).json(updatedItem);
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong when updating this class', error: err.message });
    })
});

// delete a class - this is for instructors
router.delete('/:id', restricted, (req, res) => {
    Class.remove(req.params.id)
    .then(() => {
        res.status(200).json({ message: 'This class has been successfully removed!' });
    })
    .catch(err => {
        res.status(500).json({ message: 'Something went wrong while removing this class, please try again.', error: err.message });
    })
});

module.exports = router;

