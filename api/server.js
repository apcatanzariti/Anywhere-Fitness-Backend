const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.get('/test', (req, res) => {
    res.json({ message: 'Working!!..' });
});

module.exports = server
