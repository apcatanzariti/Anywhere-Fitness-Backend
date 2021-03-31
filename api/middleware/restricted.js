const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secret/index');

module.exports = (req, res, next) => {
      const token = req.headers.authorization;

      if (!token) {
       res.status(401).json({ message: 'Token required to access this page.' });
      } else {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
          if (err) {
            res.status(401).json({ message: 'Token invalid. Please try logging in and then try again.' });
          } else {
            req.body.decodedJwt = decoded;
            next();
          }
        })
      }
};