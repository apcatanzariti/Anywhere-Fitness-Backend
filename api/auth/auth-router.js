const router = require('express').Router();
const Auth = require('./auth-model');
const bcrypt = require('bcryptjs');
const { checkRegisterCredentials, checkLoginCredentials } = require('./auth-middleware');
const restricted = require('./../middleware/restricted');

// just for testing right now - probably won't actually be used
router.get('/', (req, res) => {
    Auth.findByUsername(req.body.username)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong fetching user by filter', error: err.message });
    })
});

// just for testing right now - probably won't actually be used
router.get('/:id', restricted, (req, res) => {
    Auth.findById(req.params.id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong finding user by ID', error: err.message });
    })
});

router.post('/register', checkRegisterCredentials, (req, res) => {
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

router.post('/login', checkLoginCredentials, (req, res) => {
    const user = req.username;
    const token = req.token;

    res.json({ message: `Welcome, ${user}!`, token: token });
});

module.exports = router;