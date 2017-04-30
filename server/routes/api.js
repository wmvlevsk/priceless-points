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

// Get all posts
router.get('/employees', (req, res) => {

  manageDB.executeQuery('SELECT * FROM employee', function (err, data) {
    res.status(200).json(JSON.stringify(data.rows));
  });
});

module.exports = router;
