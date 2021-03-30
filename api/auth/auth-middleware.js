const Auth = require('./auth-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./../secret/index');

async function checkRegisterCredentials(req, res, next) {
    const { username, password, role, email } = req.body;
    const existingUser = await Auth.findByUsername(username);
    const existingEmail = await Auth.findByEmail(email);

    if (!username || !password || !role || !email) {
        res.status(401).json({ message: 'All fields must be filled out.' });
    } else if (existingUser) {
        res.status(401).json({ message: 'Username taken. Please try a different one.' });
    } else if (existingEmail) {
        res.status(401).json({ message: 'Email already in use. Please use a different one.' });
    } else {
        next();
    }
};

async function checkLoginCredentials(req, res, next) {
    const username = req.body.username.trim();
    const password = req.body.password;

    const user = await Auth.findByUsername(username);

    if (!username || !password) {
        res.status(401).json({ message: 'Username and Password required.' });
    } else if (!user || bcrypt.compareSync(password, user.password) === false) {
        res.status(401).json({ message: 'Invalid credentials, please try again.' });
    } else if (user && bcrypt.compareSync(password, user.password)) {
        const token = buildToken(user);
        req.username = user.username;
        req.token = token;
        next();
    } else {
        res.status(500).json({ message: 'Something went wrong while logging in, please try again..' });
    }
};

function buildToken(user) {
    const payload = {
        subject: user.user_id,
        username: user.username
    };
    
    const config = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, JWT_SECRET, config);
};

module.exports = {
    checkRegisterCredentials,
    checkLoginCredentials
};