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
    checkRegisterCredentials
};