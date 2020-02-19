const router = require('express').Router();

const Users = require('./usersModel.js'); // helper 
const restricted = require('../auth/restrictedMW.js');  // middleware

// /api/users
// getting allusers.  // w/out MW  √√√     //  /w MW
router.get('/', (req, res) =>{
    Users.find()
        .then(allUsers => {
            res.json(allUsers);
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        });
});


module.exports = router; 