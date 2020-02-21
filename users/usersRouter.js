const router = require('express').Router();

const Users = require('./usersModel.js'); // helper 
const restricted = require('../auth/restrictedMW.js');  
    // middleware without token 
const restrictedToken = require('../auth/restrictedToken.js'); 

// /api/users
// getting allusers.  
        // w/out MW  √√√       // /w restrictedToken  √√√ 
router.get('/', restrictedToken, (req, res) => {
    Users.find()
        .then(allUsers => {
            res.json(allUsers);
        })
        .catch(error => {
            console.log(error);
            res.status(401).json({ 
                message: ' You shall not pass! 🙌🏻'
            })
        });
});


module.exports = router; 