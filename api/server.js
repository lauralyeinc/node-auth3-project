const express = require('express');


const authRouter = require('../auth/authRouter.js');
const usersRouter = require('../users/usersRouter.js');

const jwt = require('jsonwebtoken'); 

const server = express();

server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);


// √√√ 
server.get('/', (req,res) => {
    res.send(`<h1> Node Auth 3 Project 👸 </h1>`)
});


// √√√√   test token 
server.get('/token', (req, res) => {
    const payload = {
        subject: 'testuser',
        userid: 'tester',
        favoriteColor: 'purple'
    };

    const secret = "victoria's";

    const options = {
        expiresIn: '8h'
    };

    const token = jwt.sign(payload, secret, options);

    res.json(token); 
}); 

module.exports = server; 