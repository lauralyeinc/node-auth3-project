const db = require('../data/dbConfig.js');


function find() {
    return db('users').select('id', 'username');
}; 

module.exports = {
    find
}; 