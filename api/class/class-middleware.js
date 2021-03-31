const Class = require('./class-model');
const db = require('./../data/db-config');

// check to make sure the class actually exists
async function checkClassExists(req, res, next) {
    const classId = req.params.id;

    try {
        await Class.findById(classId);
        next();
    } catch {
        res.status(401).json({ message: 'Sorry, that class is no longer available, please choose another.' });
    }
};

// check to make sure the client is not already enrolled in class
async function checkAlreadyEnrolled(req, res, next) {
    const clientId = req.body.decodedJwt.subject;
    const classId = req.params.id;

    const alreadyEnrolled = await db('clients_classes').where('class', classId).where('client', clientId);
    if (alreadyEnrolled.length > 0) {
        res.status(401).json({ message: 'You are already enrolled in this class!' });
    } else {
        console.log('not enrolled yet!');
    }
};

module.exports = {
    checkClassExists,
    checkAlreadyEnrolled
};