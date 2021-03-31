const router = require('express').Router();
const Class = require('./class-model');
const bcrypt = require('bcryptjs');
const restricted = require('./../middleware/restricted');

// create a new class - this is for instructors - returns all the details of the new class to be used by the front end
router.post('/', restricted, (req, res) => {
    Class.addClass(req.body)
    .then(newClass => {
        res.status(200).json(newClass);
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong while adding this class', error: err.message });
    })
});

// update a class - this is for instructors - returns all the details of the updated class to be used by the front end
router.put('/:id', restricted, (req, res) => {
    const id = req.params.id;
    const changes = req.body;

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

