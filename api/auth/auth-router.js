const router = require('express').Router();
const Auth = require('./auth-model');
const bcrypt = require('bcryptjs');
const { checkRegisterCredentials } = require('./auth-middleware');

// just for testing right now - probably won't actually be used
router.get('/', (req, res) => {
    Auth.findByEmail(req.body.email)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong fetching user by filter', error: err.message });
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

router.post('/', checkRegisterCredentials, (req, res) => {
    const { username, password, role, email } = req.body;
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(password, rounds);
    const userToAdd = { username, password: hash, role, email };

    Auth.add(userToAdd)
    .then(newUser => {
        res.status(200).json(newUser);
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong adding this user', error: err.message });
    })
});

module.exports = router;