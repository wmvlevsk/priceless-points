const express = require('express');
const router = express.Router();
const manageDB = require('../manageDB');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'POINTS_USER',
  password: 'POINTS_USER',
  database: 'POINTS'
});



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

// Get all posts
router.get('/employees', (req, res) => {
  // Get posts from the mock api
  connection.connect();

  connection.query('SELECT * FROM employee', function (err, rows) {
    connection.end();
    res.status(200).json(JSON.stringify(rows));
    // res.status(200).json(rows.data);
    // res.render('employee', {employee : rows});
  });

  // axios.get(`${API}/posts`)
  //   .then(posts => {
  //     res.status(200).json(posts.data);
  //   })
  //   .catch(error => {
  //     res.status(500).send(error)
  //   });
});

module.exports = router;
