const router = require('express').Router();
const Class = require('./class-model');
const bcrypt = require('bcryptjs');
const restricted = require('./../middleware/restricted');
const { checkClassExists, checkAlreadyEnrolled } = require('./class-middleware');

// get a list of classes based upon instructor id

// create a new class - this is for instructors
router.post('/', (req, res) => {
    Class.addClass(req.body)
    .then(newClass => {
        res.status(200).json(newClass);
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong while adding this class', error: err.message });
    })
});

// update a class - this is for instructors
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    Class.remove(req.params.id)
    .then(() => {
        res.status(200).json({ message: 'This class has been successfully removed!' });
    })
    .catch(err => {
        res.status(500).json({ message: 'Something went wrong while removing this class, please try again.', error: err.message });
    })
});

// client can reserve spot in class
router.post('/:id', restricted, checkClassExists, checkAlreadyEnrolled, (req, res) => {
    Class.joinClass(req.params.id, req.body.decodedJwt.subject, req.body.decodedJwt.username)
    .then(joined => {
        res.status(200).json(joined);
    })
    .catch(err => {
        res.status(500).json({ message: 'Something went wrong joining this class, please try again.', error: err.message });
    })
});

// *client can reserve spot*
// does check to see if any spots available
// adds the client to clients_classes
// grabs every entry with matching client_class_id and adds it up (create array and do .length?)
// compare that number to max class size and set the available spots to that number (max class size - array.length from above)
// req.body.decodedJwt.subject contains the users id

module.exports = router;

