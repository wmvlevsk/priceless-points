const manageDB = require('../manageDB');
var Q = require('q');

module.exports = {
    addApplauds: function (applauds, auditName) {
        var activityIDSend = 0;
        var activityIDReceive = 0;
        var deferred = Q.defer();
        var pSend = new Promise(function (resolve, reject) {
            manageDB.executeQuery('SELECT ID FROM ACTIVITY WHERE ACTIVITY_NAME LIKE "APPLAUD - SENT"', function (err, data) {
                activityIDSend = data.rows[0].ID;
                resolve();
            })
        });

        var pReceive = new Promise(function (resolve, reject) {
            manageDB.executeQuery('SELECT ID FROM ACTIVITY WHERE ACTIVITY_NAME LIKE "APPLAUD - RECEIVED"', function (err, data) {
                activityIDReceive = data.rows[0].ID;
                resolve();
            });
        });

        function loadApplauds(actIDSend, actIDRec) {
            return new Promise(function (resolve, reject) {
                employeeInfo().then(employeeTable => {
                    applauds.forEach(function (obj) {
                        obj = [obj[0], obj[3], obj[12]];
                        // If sender is eligible (as in, in the system)
                        if (employeeTable[obj[1]]) {
                            manageDB.executeQueryWithParams('INSERT INTO POINT_TALLY (EMPLOYEE_ID, ACTIVITY_ID, ENT_DT, LOAD_FILE) VALUES (?,?,?,?)', [employeeTable[obj[1]][0], actIDSend, new Date(obj[0]), auditName], function (err, data) {
                            });
                        };
                        // If receiver is eligible (as in, in the system)
                        if (employeeTable[obj[2]]) {
                            manageDB.executeQueryWithParams('INSERT INTO POINT_TALLY (EMPLOYEE_ID, ACTIVITY_ID, ENT_DT, LOAD_FILE) VALUES (?,?,?,?)', [employeeTable[obj[2]][0], actIDRec, new Date(obj[0]), auditName], function (err, data) {
                            });
                        };
                    })
                    //Audit table
                    manageDB.executeQueryWithParams('INSERT INTO LOAD_AUD (FILE_NAME) VALUES (?)', [auditName], function (err, data) {
                    });
                    resolve();
                });
            })
        }

        function employeeInfo() {
            return new Promise(function (resolve, reject) {
                manageDB.executeQuery('SELECT E.EMPLOYEE_ID, E.EMAIL FROM EMPLOYEE E', function (err, data) {
                    var employeeTable = {};
                    data.rows.forEach(function (obj) {
                        if (!employeeTable[obj.EMAIL]) {
                            employeeTable[obj.EMAIL] = [obj.EMPLOYEE_ID, obj.EMAIL];
                        }
                    });
                    resolve(employeeTable);
                })
            })
        };

        Promise.all([pSend, pReceive]).then(data => {
            loadApplauds(activityIDSend, activityIDReceive).then(function (data) {
                deferred.resolve();
            });
        });
        return deferred.promise;
    },

    addEmployees: function (employees, auditName) {
        var deferred = Q.defer();
        function loadUsers() {
            return new Promise(function (resolve, reject) {
                employees.forEach(function (obj) {
                    if (obj.length > 4) {
                        throw ('{ "status": "Error: bad input!"}');
                    }
                    manageDB.executeQueryWithParams('INSERT INTO EMPLOYEE (EMPLOYEE_ID, LAST_NAME, FIRST_NAME, EMAIL) VALUES ? ON DUPLICATE KEY UPDATE FIRST_NAME = ?, LAST_NAME = ?, EMAIL = ?', [[obj], obj[2], obj[1], obj[3]], function (err, data) {
                    });
                })
                //Audit table
                manageDB.executeQueryWithParams('INSERT INTO LOAD_AUD (FILE_NAME) VALUES (?)', [auditName], function (err, data) {
                });
                resolve();
            });
        }

        loadUsers().then(function (data) {
            var employeeCount = new Promise(function (resolve, reject) {
                manageDB.executeQuery('SELECT E.EMPLOYEE_ID, E.FIRST_NAME, E.LAST_NAME FROM EMPLOYEE E', function (err, data) {
                    var bulkInsert = {};
                    data.rows.forEach(function (obj) {
                        if (!bulkInsert[obj.EMPLOYEE_ID]) {
                            bulkInsert[obj.EMPLOYEE_ID] = [obj.EMPLOYEE_ID, obj.FIRST_NAME, obj.LAST_NAME, 0, 0, 0, 0];
                        }
                    });
                    resolve(bulkInsert);
                })
            });
            employeeCount.then(obj => {
                var returnObj = new Promise(function (resolve, rej) {
                    for (key in obj) {
                        manageDB.executeQueryWithParams('INSERT INTO REF_POINTS (EMPLOYEE_ID, FIRST_NAME, LAST_NAME, Q1_PTS, Q2_PTS, Q3_PTS, Q4_PTS) VALUES ? ON DUPLICATE KEY UPDATE EMPLOYEE_ID = ?, FIRST_NAME = (?), LAST_NAME = (?), Q1_PTS = ?, Q2_PTS = ?, Q3_PTS = ?, Q4_PTS = ?', [[obj[key]], obj[key][0], obj[key][1], obj[key][2], obj[key][3], obj[key][4], obj[key][5], obj[key][6]], function (err, data) {
                        });
                    }
                    deferred.resolve();
                    resolve();
                });
            });
        })
        return deferred.promise;
    }
};