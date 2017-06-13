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
  manageDB.executeQueryWithParams('SELECT e.first_name, e.last_name, e.email, pt.ent_dt, a.activity_name, a.point_value FROM EMPLOYEE e LEFT JOIN POINT_TALLY pt ON e.employee_id = pt.employee_id INNER JOIN ACTIVITY a ON pt.activity_id = a.id WHERE e.employee_id = ?', [e_id], function (err, data) {
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