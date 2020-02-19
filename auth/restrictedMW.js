const bcrypt = require('bcryptjs');

const Users = require('../users/usersModel.js');

module.exports = (req, res, next) => {
    // const { username, password, } = req.headers;

    // console.log(req.header);

    if (req.session && res.session.user) {
        next();
    } else {
        res.status(401).json({ message: ' You shall not pass 🙅‍♀️'}); 
    }

    // if (username && password) {
    //     Users.findBy({ username })
    //         .first()
    //         .then(user => {
    //             if (user && bcrypt.compareSync(password, user.password)) {
    //                 next();
    //             } else {
    //                 res.status(401).json({ message: " Invalid Creds, You shall not pass! 🙅‍♀️"});
    //             }
    //         })
    //         .catch(error  => {
    //             console.log("error", error)
    //             res.status(500).json({ message: 'Error, You shall not ENTER 👋🏻 '});
    //         })
    // }   else {
    //     res.status(400).json({ message: ' No creds provided, You shall not ENTER! 🙅‍♀️'});
    // }
}; 