const jwt = require('jsonwebtoken');
const secret = require('../config/secrets.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization; 
    // like body but authorzation in postman

    if(token) {
        jwt.verify(token, secret.jwtSecret, (error, decodedToken) => {
            if (error) {
                res.status(401).json({ message: ' Bad Token 🙅‍♀️'})
            } else {
                req.username = decodedToken.username; 
                // req.decodedJwt = decodedToken; 
                next();
            }
        })
    } else {
        res.status(401).json({ message: ' No token provided 🙅‍♀️ !'});
    }
};