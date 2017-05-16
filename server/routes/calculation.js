const manageDB = require('../manageDB');
var Q = require('q');

module.exports = {
    calculate: function (obj, activity, activityHash) {
        points = activityHash[activity[0]][1];
        quarter = Math.floor((activity[1].getMonth() + 3) / 3);
        switch (quarter) {
            case 1:
                obj.splice(3, 1, obj[3] + points);
                return obj;
            case 2:
                obj.splice(4, 1, obj[4] + points);
                return obj;
            case 3:
                obj.splice(5, 1, obj[5] + points);
                return obj;
            case 4:
                obj.splice(6, 1, obj[6] + points);
                return obj;
        }
    },

    pointCalculate: function () {
        var deferred = Q.defer();
        var activity = new Promise(function (resolve, reject) {
            manageDB.executeQuery('SELECT * FROM ACTIVITY', function (err, data) {
                var activityHash = {};
                data.rows.forEach(function (obj) {
                    activityHash[obj.ID] = [obj.ACTIVITY_NAME, obj.POINT_VALUE];
                });
                resolve(activityHash);
            })
        });
        activity.then(activity_data => {
            var pointTally = new Promise(function (resolve, reject) {
                manageDB.executeQuery('SELECT PT.EMPLOYEE_ID, E.FIRST_NAME, E.LAST_NAME, PT.ACTIVITY_ID, PT.ENT_DT FROM POINT_TALLY PT INNER JOIN EMPLOYEE E ON PT.EMPLOYEE_ID = E.EMPLOYEE_ID', function (err, data) {
                    var bulkInsert = {};
                    data.rows.forEach(function (obj) {
                        if (bulkInsert[obj.EMPLOYEE_ID]) {
                            //already exists
                            bulkInsert[obj.EMPLOYEE_ID] = module.exports.calculate(bulkInsert[obj.EMPLOYEE_ID], [obj.ACTIVITY_ID, obj.ENT_DT], activity_data);
                        }
                        else {
                            //create
                            bulkInsert[obj.EMPLOYEE_ID] = module.exports.calculate([obj.EMPLOYEE_ID, obj.FIRST_NAME, obj.LAST_NAME, 0, 0, 0, 0], [obj.ACTIVITY_ID, obj.ENT_DT], activity_data);
                        }
                    });
                    resolve(bulkInsert);
                })
            });
            pointTally.then(obj => {
                var finalInsert = new Promise(function (resolve, reject) {
                    for (key in obj) {
                        manageDB.executeQueryWithParams('INSERT INTO REF_POINTS (EMPLOYEE_ID, FIRST_NAME, LAST_NAME, Q1_PTS, Q2_PTS, Q3_PTS, Q4_PTS) VALUES ? ON DUPLICATE KEY UPDATE EMPLOYEE_ID = ?, FIRST_NAME = (?), LAST_NAME = (?), Q1_PTS = ?, Q2_PTS = ?, Q3_PTS = ?, Q4_PTS = ?', [[obj[key]], obj[key][0], obj[key][1], obj[key][2], obj[key][3], obj[key][4], obj[key][5], obj[key][6]], function (err, data) {
                        });
                    }
                    resolve();
                });
            });
            deferred.resolve();
        });
        return deferred.promise;
    }
};