const pool = require('./mysqlConnector');

exports.executeQueryWithParams = function (query, param, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            throw err;
        }
        connection.query(query, param, function (err, rows) {
            connection.release();
            if (!err) {
                callback(null, { rows: rows });
            }
        });
        connection.on('error', function (err) {
            throw err;
            return;
        });
    });
}

exports.executeQuery = function (query, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            throw err;
        }
        connection.query(query, function (err, rows) {
            connection.release();
            if (!err) {
                callback(null, { rows: rows });
            }
        });
        connection.on('error', function (err) {
            throw err;
            return;
        });
    });
}