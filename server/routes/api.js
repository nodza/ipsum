const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const post = require('../models/post');

const db = "mongodb://sytxplgduser:cNcMzkfaktree@ds229835.mlab.com:29835/syntaxplayground_db";

mongoose.Promise = global.Promise;
mongoose.connect(db, { useMongoClient: true }, function(err) {
  if(err) {
    console.log('Connection Error')
  }
});

router.get('/posts', function(req, res) {
  console.log('Requesting posts...');
  post.find({})
      .exec(function(err, posts) {
        if(err) {
          console.log('Error retreiving posts');
        } else {
          res.json(posts);
          console.log(posts);
        }
    });
});

module.exports = router;