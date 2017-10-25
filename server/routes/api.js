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
        }
    });
});

router.get('/details/:id', function(req, res) {
  console.log('Requesting post...');
  post.findById(req.params.id)
      .exec(function(err, post) {
        if(err) {
          console.log('Error retreiving post');
        } else {
          res.json(post);
          console.log(post);
        }
    });
});

router.post('/posts', function(req, res) {
  console.log('Creating a post...');
  var newPost = new post();
  newPost.title = req.body.title;
  newPost.url = req.body.url;
  newPost.description = req.body.description;
  newPost.save(function(err, addedPost) {
    if (err) {
      console.log('Failed to save the post');
    } else {
      res.json(addedPost);
    }
  });
});

module.exports = router;