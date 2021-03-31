const Client = require('./client-model');
const db = require('./../data/db-config');

// check to make sure the class actually exists
async function checkClassExists(req, res, next) {
    const classId = req.params.id;

    try {
        await Client.findById(classId);
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
        // console.log('not enrolled yet!');
        next();
    }
};

// check to make sure the class is not full
async function classNotFull(req, res, next) {
    const classId = req.params.id;
    const classToJoin = await db('classes').where('class_id', classId);
    const clientsInClass = classToJoin[0].class_client_number;
    const maxSize = classToJoin[0].class_max_size;

    if (clientsInClass === maxSize) {
        res.status(401).json({ message: 'Sorry, this class is already full. Please choose another.' });
    } else {
        console.log('theres room!');
        next();
    }
};

// check to make sure the client is actually enrolled in class
async function checkEnrolled(req, res, next) {
    const clientId = req.body.decodedJwt.subject;
    const classId = req.params.id;

    const enrolled = await db('clients_classes').where('class', classId).where('client', clientId);
    if (enrolled.length > 0) {
        next();
    } else {
        res.status(401).json({ message: 'You are not enrolled in this class!' });
    }
};

module.exports = {
    checkClassExists,
    checkAlreadyEnrolled,
    classNotFull,
    checkEnrolled
};