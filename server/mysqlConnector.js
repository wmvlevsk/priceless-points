// Load module
var mysql = require('mysql');
// Initialize pool
var pool      =    mysql.createPool({
    connectionLimit : 10,
    host     : '127.0.0.1',
    user     : 'POINTS_USER',
    password : 'POINTS_USER',
    database : 'POINTS',
    debug    :  false
});    
module.exports = pool;