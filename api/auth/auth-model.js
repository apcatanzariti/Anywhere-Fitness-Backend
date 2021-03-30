const db = require('./../data/db-config');

function findByUsername(username) {
    return db('users').where('username', username).first();
};

function findByEmail(email) {
    return db('users').where('email', email).first();
};

async function findById(id) {
    const user = await db('users').where('user_id', id).first().join('roles', 'users.role', 'roles.role_id');

    return {
        user_id: user.user_id,
        username: user.username,
        role: user.role_type,
        email: user.email
    };
};

async function add(user) {
    const [id] = await db('users').insert(user, 'user_id');

    return findById(id);
};

module.exports = {
    findByUsername,
    findByEmail,
    findById,
    add
};