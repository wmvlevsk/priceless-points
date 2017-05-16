const manageDB = require('../manageDB');
var Q = require('q');

module.exports = {
    getEvents: function (currentTime) {
        var deferred = Q.defer();
        if (currentTime == null) {
            manageDB.executeQuery('SELECT * FROM EVENT', function (err, data) {
                deferred.resolve(data.rows);
            });
        }
        if (currentTime <= 0) {
            manageDB.executeQueryWithParams('SELECT * FROM EVENT WHERE ENT_DT BETWEEN DATE_SUB(NOW(), INTERVAL ? DAY) AND NOW()', [currentTime * -1], function (err, data) {
                deferred.resolve(data.rows);
            });
        }
        else {
            manageDB.executeQueryWithParams('SELECT * FROM EVENT WHERE ENT_DT BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL ? DAY)', [currentTime], function (err, data) {
                deferred.resolve(data.rows);
            });
        }
        return deferred.promise;
    }
};