const jwt = require('jsonwebtoken');
const secret = require('../config/secrets.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization; 
    // like body but authorzation in postman

    if(token) {
        jwt.verify(token, secret.jwtSecret, (error, decodedToken) => {
            if (error) {
                res.status(401).json({ message: ' Shall Not Pass 🙅‍♀️'})
            } else {
                req.decodedJwt = decodedToken; 
                next();
            }
        })
    } else {
        res.status(401).json({ message: ' You shall not Enter 🙅‍♀️ !'});
    }
};