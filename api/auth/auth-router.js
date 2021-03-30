const router = require('express').Router();
const Auth = require('./auth-model');
const bcrypt = require('bcryptjs');

// just for testing right now - probably won't actually be used
router.get('/', (req, res) => {
    Auth.findAll()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong fetching all users', error: err.message });
    })
});

// just for testing right now - probably won't actually be used
router.get('/:id', (req, res) => {
    Auth.findById(req.params.id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong finding user by ID', error: err.message });
    })
});

router.post('/', (req, res) => {
    Auth.add(req.body)
    .then(newUser => {
        res.status(200).json(newUser);
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong adding this user', error: err.message });
    })
});

module.exports = router;