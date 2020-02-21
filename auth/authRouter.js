const router = require('express').Router();
const bcrypt = require('bcryptjs');  // for the hash of the PW 

const jwt = require('jsonwebtoken');
const secret = require('../config/secrets.js');

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
    let { username, password } = req.body;  //postman raw JSON 

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                console.log(user); 

                const token = generateToken(user); // middleware made a new token for a user logging in. After the token expires or they log out, it makes a new token. 

                res.status(200).json({
                    message: ` Welcome 👋🏻  ${user.username}! `,
                    token: token, 
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

// // √√√   end??   using sessions to end the session of logged in..
router.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(error => {
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


function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    };

    const options = {
        expiresIn:  "1d",
    }

    // secret is send someone else and is set up in .gitgnore so it isn't sent to github(etc). Don't normally your secrets to be shared with the world. 😘
    const token = jwt.sign(payload, secret.jwtSecret, options);

    return token; 
}



module.exports = router; 