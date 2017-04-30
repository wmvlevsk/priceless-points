var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'POINTS_USER',
    password: 'POINTS_USER',
    database: 'POINTS'
});

connection.connect();

connection.query('SELECT * from employee', function (err, rows, fields) {
    if (!err) {
        // console.log('The solution is: ', rows);
        console.log(JSON.stringify(rows));
        // console.log(rows);
    }
    else
        console.log('Error while performing Query.');
});

connection.end();