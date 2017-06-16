const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const manageDB = require('../manageDB');
const eventsModule = require('./events');
const pointCalculationModule = require('./calculation');
const loadDataModule = require('./loadData');
const authenticateModule = require('./authenticate');
const Promise = require('promise');
const moment = require('moment');

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});


/**
 * Authenticate against db, rudimentary, do not reference.
 * @param {[[]]} 
 */
router.post('/authenticate', (req, res) => {
  authenticateModule.auth(req.body.username, req.body.password).then(obj => {
    res.status(200).send(JSON.parse(obj));
  })
    .catch(error => {
      res.status(500).send(JSON.parse(error));
    });;
});


/**
 * Employee information from text
 * Also has escaped parameters to protect against SQL injection.
 * @param {string} /:q
 */
router.get('/employees/:q?', (req, res) => {
  if (req.params.q == null) {
    req.params.q = "";
  }
  var query_string = "%".concat(req.params.q, "%");
  var query_num = req.params.q;
  manageDB.executeQueryWithParams('SELECT * FROM EMPLOYEE WHERE FIRST_NAME LIKE ? OR LAST_NAME LIKE ? OR EMPLOYEE_ID = ?', [query_string, query_string, query_num], function (err, data) {
    res.status(200).json(data.rows);
  });
});


/**
 * Employee information from ID
 * Also has escaped parameters to protect against SQL injection.
 * @param {int} /:id
 */
router.get('/employee/:id', (req, res) => {
  var e_id = req.params.id;
  var quarter = 0;
  manageDB.executeQueryWithParams('SELECT e.first_name, e.last_name, e.email, pt.ent_dt, a.activity_name, a.point_value, rp.fy_pts FROM EMPLOYEE e LEFT JOIN POINT_TALLY pt ON e.employee_id = pt.employee_id INNER JOIN ACTIVITY a ON pt.activity_id = a.id INNER JOIN REF_POINTS rp ON e.employee_id = rp.employee_id WHERE e.employee_id = ?', [e_id], function (err, data) {
    if (data.rows.length > 0) {
      var activities = [];
      for (var i = 0; i < data.rows.length; i++) {
        activities.push({
          "activity_name": data.rows[i].activity_name,
          "ent_dt": moment(data.rows[i].ent_dt).format('YYYY-MM-DD'),
          "point_value": data.rows[i].point_value
        });
      }
      var responseObject = {
        "first_name": data.rows[0].first_name,
        "last_name": data.rows[0].last_name,
        "email": data.rows[0].email,
        "total_points": data.rows[0].fy_pts,
        "activities": activities
      }
      res.status(200).json(responseObject);
    }
    else {
      manageDB.executeQueryWithParams('SELECT e.first_name, e.last_name, e.email FROM EMPLOYEE e WHERE e.employee_id = ?', [e_id], function (err, data) {
        var responseObject = {
          "first_name": data.rows[0].first_name,
          "last_name": data.rows[0].last_name
        }
        res.status(200).json(responseObject);
      });
    }
  });
});

/**
 * Batch insert or update of employees
 * @param {[[]]} /:req.body.records
 */
router.post('/addEmployees', (req, res) => {
  var newEmployees = req.body.records;
  var auditName = req.body.uploadFileName;
  function loadUsers() {
    return new Promise(function (resolve, reject) {
      newEmployees.forEach(function (obj) {
        console.log(obj);
        if (obj.length > 3) {
          throw ('{ "status": "Error: bad input!"}');
        }
        manageDB.executeQueryWithParams('INSERT INTO EMPLOYEE (EMPLOYEE_ID, LAST_NAME, FIRST_NAME) VALUES ? ON DUPLICATE KEY UPDATE FIRST_NAME = ?, LAST_NAME = ?', [[obj], obj[2], obj[1]], function (err, data) {
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
      var finalInsert = new Promise(function (resolve, reject) {
        for (key in obj) {
          manageDB.executeQueryWithParams('INSERT INTO REF_POINTS (EMPLOYEE_ID, FIRST_NAME, LAST_NAME, Q1_PTS, Q2_PTS, Q3_PTS, Q4_PTS) VALUES ? ON DUPLICATE KEY UPDATE EMPLOYEE_ID = ?, FIRST_NAME = (?), LAST_NAME = (?), Q1_PTS = ?, Q2_PTS = ?, Q3_PTS = ?, Q4_PTS = ?', [[obj[key]], obj[key][0], obj[key][1], obj[key][2], obj[key][3], obj[key][4], obj[key][5], obj[key][6]], function (err, data) {
          });
        }
        resolve();
      });
      finalInsert.then(obj => {
        pointCalculationModule.pointCalculate().then(obj => {
          res.status(200).send(JSON.parse('{ "status": "Success!"}'));
        })
      })
        .catch(error => {
          // throw ('{ "status": "Error: bad input!"}');
          res.status(500).send(JSON.parse(error));
        });;
    });
  })
    .catch(error => {
      res.status(500).send(JSON.parse(error));
    });
});


/**
 * Batch insert or update of employees
 * @param {[[]]} /:req.body.records
 */
router.post('/addEmployees', (req, res) => {
  loadDataModule.addEmployees(req.body.records, req.body.uploadFileName).then(obj => {
    pointCalculationModule.pointCalculate().then(obj => {
      res.status(200).send(JSON.parse('{ "status": "Success!"}'));
    })
  })
    .catch(error => {
      // throw ('{ "status": "Error: bad input!"}');
      res.status(500).send(JSON.parse(error));
    });;
});


/**
 * Points to be shown in the List view
 */
router.get('/points', (req, res) => {
  manageDB.executeQuery('SELECT * FROM REF_POINTS', function (err, data) {
    quarter = Math.floor((new Date().getMonth() + 3) / 3);
    for (var i = 0; i < data.rows.length; i++) {
      switch (quarter) {
        case 1:
          data.rows[i].quarter = data.rows[i].Q1_PTS;
          break;
        case 2:
          data.rows[i].quarter = data.rows[i].Q2_PTS;
          break;
        case 3:
          data.rows[i].quarter = data.rows[i].Q3_PTS;
          break;
        case 4:
          data.rows[i].quarter = data.rows[i].Q4_PTS;
          break;
      }
    }
    res.status(200).json(data.rows);
  });
});


/**
 * Batch insert applauds' points
 * @param {[[]]} /:req.body.records
 */
router.post('/addApplauds', (req, res) => {
  loadDataModule.addApplauds(req.body.records, req.body.uploadFileName).then(obj => {
    pointCalculationModule.pointCalculate().then(obj => {
      res.status(200).send(JSON.parse('{ "status": "Success!"}'));
    });
  })
    .catch(error => {
      res.status(500).send(JSON.parse(error));
    });;
});


/**
 * Points are recalculated after point uploads are complete.
 */
router.get('/recalculate', (req, res) => {
  pointCalculationModule.pointCalculate().then(obj => {
    res.status(200).send(JSON.parse('{ "status": "Success!"}'));
  })
    .catch(error => {
      // throw ('{ "status": "Error: bad input!"}');
      res.status(500).send(JSON.parse(error));
    });;
});

/**
 * Event information from upcoming days
 * Also has escaped parameters to protect against SQL injection.
 * Takes negative values as well
 * @param {int} /:time
 */
router.get('/currentEvents/:time?', (req, res) => {
  eventsModule.getEvents(req.params.time).then(obj => {
    res.status(200).json(obj);
  })
});

module.exports = router;