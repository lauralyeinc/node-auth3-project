const jwt = require('jsonwebtoken');
const secret = require('../config/secrets.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization; 
    // like body but authorzation in postman
    // have to "authorize" access to all users by using the token to make code work, 

    if(token) {  // will check if there is a token and decode it.
        jwt.verify(token, secret.jwtSecret, (error, decodedToken) => {
            if (error) {
                // if no token  or if token is expired. 
                res.status(401).json({ message: ' Bad Token 🙅‍♀️'})
            } else {
                // if token it will see username in token and use the decoded to go next which is for now /api/users (all users)
                req.username = decodedToken.username; 
                next();
            }
        })
    } else {
        // there isn't a token authorzation provided to see if it's good or bad.
        res.status(401).json({ message: ' No token provided 🙅‍♀️ !'});
    }
};