const router = require('express').Router();
// const Class = require('./class-model');
const bcrypt = require('bcryptjs');
const restricted = require('./../middleware/restricted');

// get a list of classes based upon instructor id

// adding a new class - this is for instructors
router.post('/', (req, res) => {
    return null;
});

// update a class - this is for instructors
router.put('/:id', (req, res) => {
    return null;
});

// delete a class - this is for instructors
router.delete('/:id', (req, res) => {
    return null;
});

// *client can reserve spot*
// does check to see if any spots available
// adds the client to clients_classes
// grabs every entry with matching client_class_id and adds it up (create array and do .length?)
// compare that number to max class size and set the available spots to that number (max class size - array.length from above)

