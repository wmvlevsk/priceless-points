const express = require('express');
const router = express.Router();
const manageDB = require('../manageDB');

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts
router.get('/posts', (req, res) => {
  // Get posts from the mock api

  axios.get(`${API}/posts`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
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
  manageDB.executeQueryWithParams('SELECT e.first_name, e.last_name, pt.ent_dt, a.activity_name, a.point_value FROM EMPLOYEE e LEFT JOIN POINT_TALLY pt ON e.employee_id = pt.employee_id INNER JOIN ACTIVITY a ON pt.activity_id = a.id WHERE e.employee_id = ?', [e_id], function (err, data) {
    res.status(200).json(data.rows);
  });
});


/**
 * Points to be shown in the List view
 */
router.get('/points', (req, res) => {
  manageDB.executeQuery('SELECT * FROM REF_POINTS', function (err, data) {
    res.status(200).json(data.rows);
  });
});


/**
 * Event information from upcoming days
 * Also has escaped parameters to protect against SQL injection.
 * Takes negative values as well
 * @param {int} /:time
 */
router.get('/currentEvents/:time?', (req, res) => {
  var time = req.params.time;
  if (req.params.time == null) {
    manageDB.executeQuery('SELECT * FROM EVENT', function (err, data) {
      res.status(200).json(data.rows);
    });
  }
  if (time <= 0) {
    manageDB.executeQueryWithParams('SELECT * FROM EVENT WHERE ENT_DT BETWEEN DATE_SUB(NOW(), INTERVAL ? DAY) AND NOW()', [time*-1], function (err, data) {
      res.status(200).json(data.rows);
    });
  }
  else {
    manageDB.executeQueryWithParams('SELECT * FROM EVENT WHERE ENT_DT BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL ? DAY)', [time], function (err, data) {
      res.status(200).json(data.rows);
    });
  }
});

module.exports = router;