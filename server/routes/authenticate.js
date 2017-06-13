const manageDB = require('../manageDB');
var Q = require('q');

module.exports = {
    auth: function (user, pwd) {
        var deferred = Q.defer();
        var result;
        manageDB.executeQueryWithParams('SELECT * FROM LOGIN WHERE USERNAME = ?', [user], function (err, data) {
            if (data.rows.length != 0) {
                if (pwd == data.rows[0]['PASSWORD']) {
                    result = '{ "status": "Success!"}';
                }
                else {
                    result = '{ "status": "Error!"}';
                }
            }
            else {
                result = '{ "status": "Error!"}';
            }
            deferred.resolve(result);
        });
        return deferred.promise;
    }
};