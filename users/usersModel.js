const db = require('../data/dbConfig.js');

// get all users  usersRouter.js
function find() {
    return db('users').select('id', 'username');
}

//  add a new user authRouther.js
async function add(user) {
    const [id] = await db('users').insert(user);

    return findById(id);
}

//  using above function, checking to make sure it's not already
    // a user?? 
function findById(id) {
    return db('users')
        .where({id})
        .first(); 
}


//  authRouther.js  post /login filtering to find single user
function findBy(filter) {
    return db('users').where(filter); 
}

module.exports = {
    find,
    add,
    findById,
    findBy
}; 