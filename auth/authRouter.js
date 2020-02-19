const router = require('express').Router();
const bcrypt = require('bcryptjs');  // for the hash of the PW 

const Users = require('../users/usersModel.js');

// /api/auth 

//register a new user in the users table. // √√√  three users 
router.post('/register', (req, res) => {
    let user = req.body;

    console.log(user);

    const hash = bcrypt.hashSync(user.password, 8); // 2 ^ n 
    
    console.log(hash);
    
    user.password = hash;  

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            console.log('error', error)
            res.status(500).json({ 
                message: 'Failed to register new user.'
            });
        });
});

// √√√ 
router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                console.log(user); 
                // req.session.user = user; 

                res.status(200).json({
                    message: ` Welcome 👋🏻  ${user.username}! `, 
                });
            } else {
                res.status(401).json({ message: ' You Shall not pass! 🙅‍♀️'});
            }
        })
        .catch(error => {
            console.log("error", error);
            res.status(500).json({
                message: 'You shall not enter ✌🏻'
            });
        });
});

// √√√ 
router.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destory(error => {
            if (error) {
                res.send(' Can checkout any time but you cannot leave.')
            } else {
                res.send('so long, thanks for coming! ')
            }
        })
    } else {
        res.end();
    }
}); 


module.exports = router; 