const router = require('express').Router();
const Client = require('./client-model');
const restricted = require('./../middleware/restricted');
const { checkClassExists, checkAlreadyEnrolled, classNotFull, checkEnrolled } = require('./client-middleware');

// client can reserve spot in class - returns the clients username and the class they joined to be used by the front end
router.post('/:id', restricted, checkClassExists, checkAlreadyEnrolled, classNotFull, (req, res) => {
    Client.joinClass(req.params.id, req.body.decodedJwt.subject, req.body.decodedJwt.username)
    .then(joined => {
        res.status(200).json(joined);
    })
    .catch(err => {
        res.status(500).json({ message: 'Something went wrong joining this class, please try again.', error: err.message });
    })
});

// client can remove themselves from a class - returns class name so it can be used by the front end
router.delete('/:id', restricted, checkClassExists, checkEnrolled, (req, res) => {
    Client.removeFromClass(req.params.id, req.body.decodedJwt.subject)
    .then(removed => {
        res.status(200).json(removed);
    })
    .catch(err => {
        res.status(500).json({ message: 'Something went wrong while removing yourself from this class. Please try again.', error: err.message });
    })
});

// get a list of classes based upon instructor id
// get list of classes based on date
// get list of classes based on intensity
// get by location?

module.exports = router;