const Class = require('./class-model');
const db = require('./../data/db-config');

async function checkBeforeAddingToClass(req, res, next) {
    const clientId = req.body.decodedJwt.subject;
    const classId = req.params.id;
    // console.log('classId:', classId, 'clientId:', clientId);

    // check to make sure the client is not already enrolled in class
    const alreadyEnrolled = await db('clients_classes').where('class', classId).where('client', clientId);

    if (alreadyEnrolled.length > 0) {
        console.log('already enrolled!');
    } else {
        console.log('not enrolled yet!');
    }
};

module.exports = {
    checkBeforeAddingToClass
};