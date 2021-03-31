const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const authRouter = require('./auth/auth-router');
const classRouter = require('./class/class-router');
const clientRouter = require('./client/client-router');

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/auth', authRouter);
server.use('/api/class', classRouter);
server.use('/api/client', clientRouter);

server.get('/test', (req, res) => {
    res.json({ message: 'Working!!..' });
});

module.exports = server
